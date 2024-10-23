import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    // Get Ip and UserAgent to check identity before refresh
    const ip = request.ip;
    const userAgent = request.headers['x-original-user-agent'] ? request.headers['x-original-user-agent'] : request.headers['user-agent'];

    // Prioritize token in Authorization header
    const authHeader = request.headers['authorization'];
    const accessToken = authHeader
      ? authHeader.split(' ')[1]
      : request.cookies['access_token'];

    if (!accessToken) {
      // If no acess_token, check for refresh_token to refresh the tokens
      const refreshToken = request.cookies['refresh_token'];

      if (!refreshToken) {
        throw new UnauthorizedException('No tokens found');
      }

      // If the refresh_token is present, try refresh by the road
      try {
        await this.authService.refreshTokens(refreshToken, response, ip, userAgent);
        return true;
      } catch {
        throw new UnauthorizedException('Invalid refresh token');
      }
    }

    try {
      // Verify the validity of the access_token
      const payload = await this.jwtService.verifyAsync(accessToken);
      request.user = payload;
      return true;
    } catch {
      // If the access_token is invalid, check for refresh_token to refresh the tokens
      const refreshToken = request.cookies['refresh_token'];

      if (!refreshToken) {
        throw new UnauthorizedException('No refresh token found');
      }

      // If the refresh_token is present, try refresh by the road
      try {
        await this.authService.refreshTokens(refreshToken, response, ip, userAgent);
        return true;
      } catch {
        throw new UnauthorizedException('Invalid refresh token');
      }
    }
  }
}
