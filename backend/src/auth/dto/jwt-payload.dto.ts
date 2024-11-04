import { IsNotEmpty, IsString, IsMongoId, IsNumber } from 'class-validator';

export class JwtPayload {
  @IsMongoId()
  @IsNotEmpty()
  session: string;

  @IsMongoId()
  @IsNotEmpty()
  sub: string;

  @IsString()
  @IsNotEmpty()
  access_level: string;

  @IsNumber()
  @IsNotEmpty()
  iat: number;

  @IsNumber()
  @IsNotEmpty()
  exp: number;
}
