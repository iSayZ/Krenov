import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminAccount, AdminAccountDocument } from './admin-account.schema';
import * as argon2 from 'argon2';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AdminAccount.name)
    private adminAccountModel: Model<AdminAccountDocument>,
    private jwtService: JwtService
  ) {}

  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  }

  async verifyPassword(accountPassword: string, password: string) {
    const isPasswordValid = await argon2.verify(accountPassword, password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(
        `L'email ou le mot de passe est incorrect.`
      );
    }
  }

  private async generateToken(account): Promise<string> {
    const payload = { sub: account._id, access_level: account.access_level };
    const access_token = await this.jwtService.signAsync(payload);
    return access_token;
  }

  async validateUser(loginDto: LoginDto): Promise<AdminAccount> {
    const email = loginDto.email.toLowerCase();
    const password = loginDto.password;

    const account = await this.adminAccountModel
      .findOne({ email })
      .lean()
      .exec();

    if (!account) {
      throw new NotFoundException(`L'email ou le mot de passe est incorrect.`);
    }

    await this.verifyPassword(account.password, password);
    delete account.password;

    return account;
  }

  async login(loginDto: LoginDto, response: Response): Promise<string> {
    const account = await this.validateUser(loginDto);

    const token = await this.generateToken(account);

    response.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60, // 1 hour before expiration
    });

    return 'Connexion réussie';
  }

  async logout(response: Response): Promise<string> {
    response.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
    });

    return 'Déconnexion réussie';
  }
}
