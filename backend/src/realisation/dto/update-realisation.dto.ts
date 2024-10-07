import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class UpdateRealisationDto {
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  order: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  slug: string;

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

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags: string[];

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  status: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  author: string;
}
