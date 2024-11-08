import {
  Post,
  Body,
  Controller,
  UseGuards,
  Get,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import {
  updatePasswordAccountDto,
  updateEmailAccountDto,
  resetPasswordAccountDto,
} from '../admin/dto/update-admin-account.dto';
import { ChangeRequestService } from './change-request.service';
import { User } from 'src/decorators/user.decorator';
import { AuthService } from 'src/auth/auth.service';

@Controller('change-requests')
export class ChangeRequestController {
  constructor(
    private readonly changeRequestService: ChangeRequestService,
    private readonly authService: AuthService
  ) {}

  // Route to create a change request to change password
  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  async changePasswordRequest(
    @Body() updatePasswordAccountDto: updatePasswordAccountDto,
    @User('sub') userId: string
  ) {
    return this.changeRequestService.changePasswordRequest(
      userId,
      updatePasswordAccountDto
    );
  }

  // Route to create a change request to change email
  @Post('change-email')
  @UseGuards(JwtAuthGuard)
  async changeEmailRequest(
    @Body() updateEmailAccountDto: updateEmailAccountDto,
    @User('sub') userId: string
  ) {
    return this.changeRequestService.changeEmailRequest(
      userId,
      updateEmailAccountDto
    );
  }

  // Route to create a change request to reset password
  @Post('reset-password')
  async resetPasswordRequest(
    @Body() resetPasswordAccountDto: resetPasswordAccountDto
  ) {
    return this.changeRequestService.resetPasswordRequest(
      resetPasswordAccountDto
    );
  }

  // Route to check validity token of change request
  @Get('verify/:token')
  async verifyChangeRequest(@Param('token') token: string) {
    // Verify token validity and get all infos of the change request
    const changeRequest =
      await this.changeRequestService.verifyTokenAndGetRequest(token);

    if (!changeRequest) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    if (changeRequest.request_type === 'change_email') {
      return {
        requestType: changeRequest.request_type,
        newValue: changeRequest.new_value,
      };
    } else {
      return { requestType: changeRequest.request_type };
    }
  }

  // Route to apply change of the change request after check token
  @Post('confirm/:token')
  async confirmChangeRequest(
    @Param('token') token: string,
    @Body('requestType') requestType: string,
    @Body('newPassword') newPassword: string
  ) {
    let changeRequest =
      await this.changeRequestService.verifyTokenAndGetRequest(token);
    if (!changeRequest || changeRequest.request_type !== requestType) {
      throw new UnauthorizedException('Invalid request');
    }

    if (requestType === 'reset_password') {
      const hashedPassword = await this.authService.hashPassword(newPassword);
      changeRequest = await this.changeRequestService.updateNewValueRequest(
        changeRequest.change_request_id,
        hashedPassword
      );
    }

    // Process the request (e.g., change password, update email, etc.)
    const result =
      await this.changeRequestService.processChangeRequest(changeRequest);

    return result;
  }
}
