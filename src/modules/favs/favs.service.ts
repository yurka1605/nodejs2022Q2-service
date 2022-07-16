import { FavsEntity } from './entities/fav.entity';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InMemoryDBService } from 'src/in-memory-db';
import { DataBaseEntity } from 'src/constants';
import { ArtistEntity } from 'src/modules/artist/entities/artist.entity';
import { AlbumEntity } from '../album/entities/album.entity';
import { TrackEntity } from '../track/entities/track.entity';

interface Dictionary {
  [key: string]: string;
}

interface FavsDictionary {
  [key: string]: Dictionary;
}

@Injectable()
export class FavsService {
  constructor(private readonly db: InMemoryDBService) {}

  findAll(): FavsEntity {
    const { albums, artists, tracks } = this.db.get<{
      albums: FavsDictionary;
      artists: FavsDictionary;
      tracks: FavsDictionary;
    }>([DataBaseEntity.FAVOURITES]);

    return {
      albums: this.getEntitiesById<AlbumEntity>(albums, DataBaseEntity.ALBUMS),
      artists: this.getEntitiesById<ArtistEntity>(
        artists,
        DataBaseEntity.ARTISTS,
      ),
      tracks: this.getEntitiesById<TrackEntity>(tracks, DataBaseEntity.TRACKS),
    };
  }

  add(table: string, id: string): void {
    if (this.checkEntityExist(table, id)) {
      this.db.add([DataBaseEntity.FAVOURITES, table], { id });
    }
    return;
  }

  remove(table: string, id: string) {
    return this.db.delete([DataBaseEntity.FAVOURITES, table], id);
  }

  private checkEntityExist(table: string, id: string): any {
    const entity = this.db.get([table, id]);
    if (!entity) {
      throw new UnprocessableEntityException(
        `${table.slice(0, table.length - 1)} with id ${id} not exist`,
      );
    }
    return !!entity;
  }

  private getEntitiesById<T>(entities: FavsDictionary, table: string): T[] {
    return Object.values(entities).map(({ id }) => this.db.get<T>([table, id]));
  }
}
