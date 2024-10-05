import { IsMongoId, IsNotEmpty } from 'class-validator';

export class FindOneParams {
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}
