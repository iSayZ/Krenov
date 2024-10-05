import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class CreateRealisationDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  imageUrls: string[];
}
