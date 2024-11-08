import { IsString, IsNotEmpty } from 'class-validator';

class updatePasswordAccountDto {
  @IsString()
  @IsNotEmpty()
  currentPassword: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}

class updateEmailAccountDto {
  @IsString()
  @IsNotEmpty()
  currentEmail: string;

  @IsString()
  @IsNotEmpty()
  newEmail: string;
}

class resetPasswordAccountDto {
  @IsString()
  @IsNotEmpty()
  email: string;
}

export {
  updatePasswordAccountDto,
  updateEmailAccountDto,
  resetPasswordAccountDto,
};
