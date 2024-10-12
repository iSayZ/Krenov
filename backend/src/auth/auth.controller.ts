import { Body, Controller, Post, Res, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const message = await this.authService.login(loginDto, response);

    return response.status(200).json({ message });
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Res() response: Response) {
    const message = await this.authService.logout(response);
    console.log(message);

    return response.status(200).json({ message });
  }

  @Get('verify-access')
  @UseGuards(JwtAuthGuard)
  async verifyAccess() {
    return { message: 'Access verified' };
  }
}
