import { Injectable } from '@nestjs/common';
import { EntityService } from 'src/common/services/base-entity.service';
import { DataBaseEntity } from 'src/constants';
import { InMemoryDBService } from 'src/in-memory-db';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TrackService extends EntityService<TrackEntity> {
  private linkedTables: string[] = [
    DataBaseEntity.ALBUMS,
    DataBaseEntity.ARTISTS,
  ];
  constructor(protected db: InMemoryDBService) {
    super(db, DataBaseEntity.TRACKS, TrackEntity);
  }

  override create(createTrackDto: CreateTrackDto): TrackEntity {
    this.checkRefers<CreateTrackDto>(this.linkedTables, createTrackDto);
    return super.create(createTrackDto);
  }

  override update(id: string, updateTrackDto: UpdateTrackDto): TrackEntity {
    this.checkRefers<UpdateTrackDto>(this.linkedTables, updateTrackDto);
    return super.update(id, updateTrackDto);
  }
}
