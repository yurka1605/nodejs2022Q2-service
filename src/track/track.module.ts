import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { InMemoryDBService } from 'src/in-memory-db';

@Module({
  controllers: [TrackController],
  providers: [TrackService, InMemoryDBService]
})
export class TrackModule { }
