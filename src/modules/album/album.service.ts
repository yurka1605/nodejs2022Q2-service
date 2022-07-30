import { PrismaService } from './../../common/modules/prisma/prisma.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Injectable } from '@nestjs/common';
import { EntityService } from 'src/common/services/base-entity.service';
import { DataBaseEntity } from 'src/constants';
import { Album } from './entities/album.entity';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService extends EntityService<Album> {
  constructor(protected prisma: PrismaService) {
    super(prisma, DataBaseEntity.ALBUMS, Album);
  }
  // override create(createAlbumDto: CreateAlbumDto): AlbumEntity {
  //   this.checkRefers<CreateAlbumDto>([DataBaseEntity.ARTISTS], createAlbumDto);
  //   return super.create(createAlbumDto);
  // }
  // override update(id: string, updateAlbumDto: UpdateAlbumDto): AlbumEntity {
  //   this.checkRefers<UpdateAlbumDto>([DataBaseEntity.ARTISTS], updateAlbumDto);
  //   return super.update(id, updateAlbumDto);
  // }
}
