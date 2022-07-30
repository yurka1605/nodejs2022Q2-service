import { PrismaService } from './../../common/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { EntityService } from 'src/common/services/base-entity.service';
import { DataBaseEntity } from 'src/constants';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService extends EntityService<Album> {
  constructor(protected prisma: PrismaService) {
    super(prisma, DataBaseEntity.ALBUMS, Album);
  }
}
