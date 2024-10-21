import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateProfileAccountDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  role: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  biography: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  avatar: string;
}
