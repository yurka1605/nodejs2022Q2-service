import { ArtistModule } from './modules/artist/artist.module';
import { Module } from '@nestjs/common';
import { CoreModule } from './common/core.module';
import { InMemoryDBService } from './in-memory-db';
import { UsersModule } from './modules/users/users.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavsModule } from './favs/favs.module';

@Module({
  imports: [
    CoreModule,
    UsersModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavsModule,
  ],
  providers: [InMemoryDBService],
})
export class AppModule { }
