import { IsNotEmpty, IsString } from 'class-validator';

export class FindOneSlug {
  @IsString()
  @IsNotEmpty()
  slug: string;
}
