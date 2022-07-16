import { Injectable } from '@nestjs/common';
import { EntityService } from 'src/common/services/base-entity.service';
import { DataBaseEntity } from 'src/constants';
import { InMemoryDBService } from 'src/in-memory-db';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistService extends EntityService<ArtistEntity> {
  constructor(protected db: InMemoryDBService) {
    super(db, DataBaseEntity.ARTISTS, ArtistEntity);
  }
}
