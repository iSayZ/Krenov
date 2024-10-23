import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { TwoFactorModule } from 'src/twofactor/twofactor.module';
import {
  AdminAccount,
  AdminAccountSchema,
} from '../admin/schema/admin-account.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AdminAccount.name, schema: AdminAccountSchema },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    forwardRef(() => TwoFactorModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
