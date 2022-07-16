import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { InMemoryDBService } from 'src/in-memory-db';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, InMemoryDBService]
})
export class AlbumModule { }
