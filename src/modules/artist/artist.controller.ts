import { Artist } from './entities/artist.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpStatus,
  HttpCode,
  Put,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  async findAll(): Promise<Artist[]> {
    return (await this.artistService.findAll()).map(
      (artist) => new Artist(artist),
    );
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Artist> {
    return new Artist(await this.artistService.findOne(id));
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    return new Artist(await this.artistService.update(id, updateArtistDto));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<Artist> {
    return this.artistService.remove(id);
  }
}
