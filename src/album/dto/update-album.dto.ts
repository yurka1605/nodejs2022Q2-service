import { PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { CreateAlbumDto } from './create-album.dto';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
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
