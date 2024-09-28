import { IsString, IsNotEmpty, IsArray, IsDateString, IsOptional } from 'class-validator';

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

    @IsDateString()
    @IsNotEmpty()
    date: Date;
  }