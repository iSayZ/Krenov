import {
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
  Get,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { TwoFactorService } from 'src/twofactor/twofactor.service';
import { LoginDto } from './dto/login.dto';
import { Response, Request } from 'express';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { Verify2FADto } from './dto/verify-2fa.dto';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly twoFactorService: TwoFactorService
  ) {}

  // Road to login
  @Post('login')
  @Throttle({
    default: {
      ttl: 600000, // 5min in milliseconds
      limit: 10, // Maximum attempts
    },
  })
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request
  ) {
    // Check login logs
    const account = await this.authService.validateCredentials(
      loginDto,
      response
    );

    // If 2FA is enabled, break here to check 2FA
    if (account.two_fa_enabled) {
      response.status(200);

      return {
        require2FA: true,
        message: 'Veuillez entrer votre code 2FA',
      };
    }

    // Get IP / userAgent to identificate user
    const ip = request.ip;
    const userAgent = request.headers['user-agent'];

    if (!userAgent) {
      return;
    }

    // Last step of login to verify identify and generate tokens
    const message = await this.authService.completeLogin(
      account,
      response,
      ip,
      userAgent
    );

    response.status(200);

    return { require2FA: false, message };
  }

  // Road to complete login if 2FA is enabled
  @Post('verify-2fa')
  @Throttle({
    default: {
      ttl: 600000, // 10min in milliseconds
      limit: 5, // Maximum attempts
    },
  })
  async verify2FA(
    @Body() verify2FADto: Verify2FADto,
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request
  ) {
    const temporaryToken = request.cookies['temporary_token'];

    if (!temporaryToken) {
      throw new UnauthorizedException('Token invalide');
    }

    // Verify temporary token
    const account =
      await this.authService.validateTemporaryToken(temporaryToken);

    // Verify 2FA code
    await this.twoFactorService.verifyTOTP(
      account._id.toString(),
      verify2FADto.code
    );

    // Get IP / userAgent to identificate user
    const ip = request.ip;
    const userAgent = request.headers['user-agent'];

    // Last step of login to verify identify and generate tokens
    const message = await this.authService.completeLogin(
      account,
      response,
      ip,
      userAgent
    );

    response.status(200);

    return { success: true, message };
  }

  // Road to logout
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(
    @Req() request: Request,
    @Res() response: Response,
    @User('sub') userId: string,
    @User('session') sessionId: string
  ) {
    const message = await this.authService.logout(userId, sessionId, response);

    return response.status(200).json({ message });
  }

  // Road to verify the accessToken
  @Get('verify-access')
  @UseGuards(JwtAuthGuard)
  async verifyAccess() {
    return { message: 'Access verified' };
  }

  // Road to refresh the accessToken by a refreshToken
  @Post('refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    // Prioritize token in Authorization header
    const authHeader = request.headers['authorization'];
    const refreshToken = authHeader
      ? authHeader.split(' ')[1]
      : request.cookies['refresh_token'];

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    // Get IP / userAgent to identificate user
    const ip = request.ip;
    const userAgent = request.headers['x-original-user-agent'] as string;

    // Refresh news tokens
    const newAccessToken = await this.authService.refreshTokens(
      refreshToken,
      response,
      ip,
      userAgent
    );

    response.status(200);

    return { newAccessToken };
  }

  // Road to verify identity before action
  @Post('verify-identity')
  @UseGuards(JwtAuthGuard)
  @Throttle({
    default: {
      ttl: 600000, // 5min in milliseconds
      limit: 10, // Maximum attempts
    },
  })
  async verifyIdentity(
    @User('sub') userId,
    @Body() formdata: { password: string }
  ) {
    return this.authService.verifyIdentity(userId, formdata.password);
  }
}
