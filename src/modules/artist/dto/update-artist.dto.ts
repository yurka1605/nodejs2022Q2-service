import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class UpdateArtistDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  grammy: boolean;
}
