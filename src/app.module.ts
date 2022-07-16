import { ArtistModule } from './modules/artist/artist.module';
import { Module } from '@nestjs/common';
import { CoreModule } from './common/core.module';
import { InMemoryDBService } from './in-memory-db';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    CoreModule,
    UsersModule,
    ArtistModule,
  ],
  providers: [InMemoryDBService],
})
export class AppModule { }
