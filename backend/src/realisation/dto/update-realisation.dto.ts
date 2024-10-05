import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class UpdateRealisationDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  content: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  imageUrls: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  imagesToDelete: string[];
}
