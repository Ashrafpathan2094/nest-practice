import { IsArray, IsMongoId, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  name: string;

  @IsString()
  genre: string;

  @IsArray()
  @IsMongoId({ each: true })
  songs: string[];
}
