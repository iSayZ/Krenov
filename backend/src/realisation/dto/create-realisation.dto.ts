import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsOptional,
  IsNumber,
  IsMongoId,
} from 'class-validator';

export class CreateRealisationDto {
  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsNumber()
  @IsOptional()
  order: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  header: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  imageUrls: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags: string[];

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsMongoId()
  @IsOptional()
  author: string;
}
