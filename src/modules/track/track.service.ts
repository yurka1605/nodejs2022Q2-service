import { PrismaService } from 'src/common/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { EntityService } from 'src/common/services/base-entity.service';
import { DataBaseEntity } from 'src/constants';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService extends EntityService<Track> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, DataBaseEntity.TRACK, Track);
  }
}
