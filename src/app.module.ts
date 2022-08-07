import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ArtistModule } from './modules/artist/artist.module';
import { UsersModule } from './modules/users/users.module';
import { AlbumModule } from './modules/album/album.module';
import { TrackModule } from './modules/track/track.module';
import { FavsModule } from './modules/favs/favs.module';
import { PrismaModule } from './common/modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import LogsMiddleware from './common/middlewares/logs.middleware';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionsLoggerFilter } from './exception.filter';
import { WriteLogService } from './common/services/write-logs.service';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavsModule,
    PrismaModule,
  ],
  providers: [
    WriteLogService,
    {
      provide: APP_FILTER,
      useClass: ExceptionsLoggerFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
