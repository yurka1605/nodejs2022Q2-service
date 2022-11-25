import { Favs } from './entities/fav.entity';
import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { DataBaseEntity } from 'src/constants';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  findAll(): Promise<Omit<Favs, 'id'>> {
    return this.favsService.findAll();
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  addTrackToFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.add(DataBaseEntity.TRACK, id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrackFromFavs(@Param('id', new ParseUUIDPipe()) id: string): void {
    this.favsService.remove(DataBaseEntity.TRACK, id);
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  addAlbumToFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.add(DataBaseEntity.ALBUM, id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbumFromFavs(@Param('id', new ParseUUIDPipe()) id: string): void {
    this.favsService.remove(DataBaseEntity.ALBUM, id);
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  addArtistToFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.add(DataBaseEntity.ARTIST, id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtistFromFavs(@Param('id', new ParseUUIDPipe()) id: string): void {
    this.favsService.remove(DataBaseEntity.ARTIST, id);
  }
}
