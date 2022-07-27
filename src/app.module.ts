import { Module } from '@nestjs/common';
import { InMemoryDBService } from './in-memory-db';
import { ArtistModule } from './modules/artist/artist.module';
import { UsersModule } from './modules/users/users.module';
import { AlbumModule } from './modules/album/album.module';
import { TrackModule } from './modules/track/track.module';
import { FavsModule } from './modules/favs/favs.module';
import { PrismaModule } from './common/modules/prisma/prisma.module';
import { CoreModule } from './common/modules/core.module';

@Module({
  imports: [
    CoreModule,
    UsersModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavsModule,
    PrismaModule,
  ],
  providers: [InMemoryDBService],
})
export class AppModule {}
