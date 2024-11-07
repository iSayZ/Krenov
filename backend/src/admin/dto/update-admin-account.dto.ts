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

export { updatePasswordAccountDto, updateEmailAccountDto };
