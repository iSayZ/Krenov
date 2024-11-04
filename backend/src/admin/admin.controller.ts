import { Get, Req, Put, Body, Controller, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Request } from 'express';
import { UpdateProfileAccountDto } from './dto/update-admin-profile.dto';
import { User } from 'src/decorators/user.decorator';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('profile')
  async readProfile(@Req() request: Request, @User('sub') userId: string) {
    return this.adminService.readProfile(userId);
  }

  @Get('settings')
  async readSettingsProfile(
    @Req() request: Request,
    @User('sub') userId: string
  ) {
    return this.adminService.readSettingsProfile(userId);
  }

  @Put('profile/update')
  async updateProfile(
    @Body() updateProfileAccountDto: UpdateProfileAccountDto,
    @Req() request: Request,
    @User('sub') userId: string
  ) {
    return this.adminService.updateSettingsProfile(
      userId,
      updateProfileAccountDto
    );
  }
}
