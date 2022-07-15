import { Module } from '@nestjs/common';
import { CoreModule } from './modules/core.module';
import { InMemoryDBService } from './in-memory-db';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [CoreModule, UsersModule],
  providers: [InMemoryDBService],
})
export class AppModule { }
