import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as argon2 from 'argon2';
import { Response } from 'express';
import { Model } from 'mongoose';
import {
  AdminAccount,
  AdminAccountDocument,
} from '../admin/admin-account.schema';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AdminAccount.name)
    private adminAccountModel: Model<AdminAccountDocument>,
    private jwtService: JwtService
  ) {}

  // --------------------------------------------------------- Crypt & Decrypt - Functions ---------------------------------------------------------

  async hashPassword(password: string): Promise<string> {
    return await argon2.hash(password);
  }

  async verifyPassword(accountPassword: string, password: string) {
    return await argon2.verify(accountPassword, password);
  }

  // --------------------------------------------------------- Tokens - Functions ---------------------------------------------------------

  // Function to generate and stock the tokens
  private async generateTokens(
    account
  ): Promise<{ access_token: string; refresh_token: string }> {
    const payload = { sub: account._id, access_level: account.access_level };

    // Generate access_token, with expiration of 15mins
    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });

    // Generate refresh_token, with expiration of 7days
    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    // Hash the refresh_token
    const hashedRefreshToken = await this.hashPassword(refresh_token);

    // Stock refresh_token hashed in the account
    await this.adminAccountModel.findByIdAndUpdate(account._id, {
      refresh_token: hashedRefreshToken,
      last_login: new Date(),
    });

    return {
      access_token,
      refresh_token,
    };
  }

  // Function to refresh a new tokens by refresh_token if it is valid
  async refreshTokens(
    refreshToken: string,
    response: Response
  ): Promise<string> {
    try {
      // Verify validity of refresh_token and extract the payload
      const payload = await this.jwtService.verifyAsync(refreshToken);
      // Find the account match of payload sub
      const account = await this.adminAccountModel.findById(payload.sub);

      if (!account || !account.refresh_token) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Verify if the hashed refresh_token stocked in account matches
      const isRefreshTokenValid = await argon2.verify(
        account.refresh_token,
        refreshToken
      );

      if (!isRefreshTokenValid) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Generates new tokens
      const tokens = await this.generateTokens(account);

      // Set cookies
      response.cookie('access_token', tokens.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        path: '/',
        maxAge: 1000 * 60 * 15, // 15min
      });

      response.cookie('refresh_token', tokens.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7days
      });

      return 'Refresh réussi';
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  // --------------------------------------------------------- Auth Services - Functions ---------------------------------------------------------

  private async validateUser(
    loginDto: LoginDto
  ): Promise<AdminAccountDocument> {
    const email = loginDto.email.toLowerCase();
    const password = loginDto.password;

    const account = await this.adminAccountModel.findOne({ email }).exec();

    if (!account) {
      throw new NotFoundException(`L'email ou le mot de passe est incorrect.`);
    }

    const isPasswordValid = await this.verifyPassword(
      account.password,
      password
    );

    if (!isPasswordValid) {
      throw new NotFoundException(`L'email ou le mot de passe est incorrect.`);
    }

    return account;
  }

  async validateCredentials(loginDto: LoginDto, response: Response) {
    const account = await this.validateUser(loginDto);

    // Generate a temporary token if 2FA is enabled
    if (account.two_fa_enabled) {
      const temporaryToken = await this.jwtService.signAsync(
        { sub: account._id, type: 'temporary' },
        { expiresIn: '5m' }
      );

      // Set temporary cookie
      response.cookie('temporary_token', temporaryToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        path: '/',
        maxAge: 1000 * 60 * 5, // 5min
      });

      return { account };
    }

    return { account };
  }

  async validateTemporaryToken(token: string): Promise<AdminAccountDocument> {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      if (payload.type !== 'temporary') {
        throw new UnauthorizedException('Token invalide');
      }
      return this.adminAccountModel.findById(payload.sub);
    } catch {
      throw new UnauthorizedException('Token invalide');
    }
  }

  async completeLogin(
    account: AdminAccount,
    response: Response
  ): Promise<string> {
    const tokens = await this.generateTokens(account);

    // Set cookies
    response.cookie('access_token', tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
      maxAge: 1000 * 60 * 15, // 15min
    });

    response.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7days
    });

    return 'Connexion réussie';
  }

  async logout(id: string, response: Response): Promise<string> {
    // Invalid the refresh_token in the account
    await this.adminAccountModel.findByIdAndUpdate(id, {
      refresh_token: 'logout',
    });

    // Delete cookies
    response.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
    });

    response.clearCookie('refresh_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
    });

    return 'Déconnexion réussie';
  }

  async verifyIdentity(id: string, password: string): Promise<string> {
    const account = await this.adminAccountModel.findById(id).exec();

    if (!account) {
      throw new NotFoundException(`Le mot de passe est incorrect.`);
    }

    const isPasswordValid = await this.verifyPassword(
      account.password,
      password
    );

    if (!isPasswordValid) {
      throw new NotFoundException('Le mot de passe est incorrect.');
    }

    return 'Vérification réussie';
  }
}
