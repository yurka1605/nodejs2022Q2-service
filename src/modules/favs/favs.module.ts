import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { InMemoryDBService } from 'src/in-memory-db';

@Module({
  controllers: [FavsController],
  providers: [FavsService, InMemoryDBService],
})
export class FavsModule {}
