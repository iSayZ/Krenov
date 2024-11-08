import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { User } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { TwoFactorService } from './twofactor.service';

@Controller('2fa')
@UseGuards(JwtAuthGuard)
export class TwoFactorController {
  constructor(private readonly twoFactorService: TwoFactorService) {}

  // Setup to initialize 2FA, generate new secret / QR Code
  @Post('setup/init')
  async enableTwoFactor(@User('sub') userId): Promise<string> {
    try {
      const qrCode = await this.twoFactorService.initializeSecret(userId);
      return qrCode;
    } catch (error) {
      console.error(error);
      throw new BadRequestException(
        "Erreur lors de l'initialisation de la 2FA"
      );
    }
  }

  // To validate to finish initialization of 2FA
  @Post('setup/validate')
  async validateAndEnableTwoFactor(
    @User('sub') userId,
    @Body() body: { code: string }
  ): Promise<string[]> {
    try {
      const { isValid, backupCodes } =
        await this.twoFactorService.verifyAndEnable(userId, body.code);

      if (!isValid) {
        throw new BadRequestException('Code invalide');
      }

      return backupCodes;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // To get 2FA status of user
  @Get('status')
  async get2FAStatus(
    @User('sub') userId: string
  ): Promise<{ is2FAEnabled: boolean }> {
    const status2FA = await this.twoFactorService.get2FAStatus(userId);
    return {
      is2FAEnabled: status2FA,
    };
  }

  // To check 2FA code to verify access before action
  @Post('verify-2fa')
  @Throttle({
    default: {
      ttl: 600000, // 10min in milliseconds
      limit: 5, // Maximum attempts
    },
  })
  async verify2FA(
    @User('sub') userId: string,
    @Body() body: { code: string }
  ): Promise<{ success: boolean }> {
    const isValid = await this.twoFactorService.verifyTOTP(userId, body.code);
    return isValid;
  }

  // To generate new backup codes 2FA
  @Get('backup/generate')
  async generateBackupCodes(@User('sub') userId: string): Promise<string[]> {
    const backupCodes =
      await this.twoFactorService.generateAndStoreBackupCodes(userId);
    return backupCodes;
  }

  // To disable 2FA settings
  @Post('disable')
  async disableTwoFactor(
    @User('sub') userId: string
  ): Promise<{ message: string }> {
    return this.twoFactorService.reset2FA(userId);
  }
}
