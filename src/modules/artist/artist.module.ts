import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { InMemoryDBService } from 'src/in-memory-db';
import { PrismaModule } from 'src/common/modules/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ArtistController],
  providers: [ArtistService, InMemoryDBService],
})
export class ArtistModule {}
