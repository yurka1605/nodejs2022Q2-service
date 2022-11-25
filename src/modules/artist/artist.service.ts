import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/modules/prisma/prisma.service';
import { EntityService } from 'src/common/services/base-entity.service';
import { DataBaseEntity } from 'src/constants';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService extends EntityService<Artist> {
  constructor(protected prisma: PrismaService) {
    super(prisma, DataBaseEntity.ARTIST, Artist);
  }
}
