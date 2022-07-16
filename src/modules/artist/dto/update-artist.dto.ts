import { PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
import { CreateArtistDto } from './create-artist.dto';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  grammy: boolean;
}
