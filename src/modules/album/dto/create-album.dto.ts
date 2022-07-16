import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  year: number;

  @IsUUID()
  @IsNotEmpty()
  @IsOptional()
  artistId: string | null;
}
