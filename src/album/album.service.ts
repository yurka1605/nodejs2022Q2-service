import { CreateAlbumDto } from './dto/create-album.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { EntityService } from 'src/common/services/base-entity.service';
import { DataBaseEntity } from 'src/constants';
import { InMemoryDBService } from 'src/in-memory-db';
import { AlbumEntity } from './entities/album.entity';
import { ArtistEntity } from 'src/modules/artist/entities/artist.entity';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService extends EntityService<AlbumEntity> {
  constructor(protected db: InMemoryDBService) {
    super(
      db,
      DataBaseEntity.ALBUMS,
      AlbumEntity,
      [DataBaseEntity.TRACKS],
      'albumId'
    );
  }

  override create(createAlbumDto: CreateAlbumDto): AlbumEntity {
    this.checkArtistId(createAlbumDto);
    return super.create(createAlbumDto);
  }

  override update(id: string, updateAlbumDto: UpdateAlbumDto): AlbumEntity {
    this.checkArtistId(updateAlbumDto);
    return super.update(id, updateAlbumDto);
  }

  private checkArtistId(dto: Partial<AlbumEntity>): void {
    if (dto?.artistId) {
      const artist = this.db.get<ArtistEntity>([DataBaseEntity.ARTISTS, dto.artistId]);
      if (!artist) throw new BadRequestException(`Artist with id ${dto.artistId} not exist`);
    }
  }
}