import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateSongDto {
  @IsString()
  title: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true, message: 'Each artist must be a string' })
  artist: string[];

  @IsDateString()
  releaseDate: string;

  @IsNumber()
  duration: number;
}
