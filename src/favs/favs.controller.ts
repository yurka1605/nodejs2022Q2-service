import { FavsEntity } from './entities/fav.entity';
import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { DataBaseEntity } from 'src/constants';

@Controller('favs')
export class FavsController {
  constructor(
    private readonly favsService: FavsService,
  ) { }

  @Get()
  findAll(): FavsEntity {
    return this.favsService.findAll();
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  addTrackToFavs(@Param('id', new ParseUUIDPipe()) id: string): void {
    this.favsService.add(DataBaseEntity.TRACKS, id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrackFromFavs(@Param('id', new ParseUUIDPipe()) id: string): void {
    this.favsService.remove(DataBaseEntity.TRACKS, id);
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  addAlbumToFavs(@Param('id', new ParseUUIDPipe()) id: string): void {
    this.favsService.add(DataBaseEntity.ALBUMS, id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbumFromFavs(@Param('id', new ParseUUIDPipe()) id: string): void {
    this.favsService.remove(DataBaseEntity.ALBUMS, id);
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  addArtistToFavs(@Param('id', new ParseUUIDPipe()) id: string): void {
    this.favsService.add(DataBaseEntity.ARTISTS, id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtistFromFavs(@Param('id', new ParseUUIDPipe()) id: string): void {
    this.favsService.remove(DataBaseEntity.ARTISTS, id);
  }
}
