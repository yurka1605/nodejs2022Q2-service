import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @IsUUID()
  @IsNotEmpty()
  @IsOptional()
  artistId: string | null;

  @IsUUID()
  @IsNotEmpty()
  @IsOptional()
  albumId: string | null;
}
