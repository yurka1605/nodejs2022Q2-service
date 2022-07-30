import { PrismaService } from 'src/common/modules/prisma/prisma.service';
import { NIL as NIL_UUID } from 'uuid';
import { Favs } from './entities/fav.entity';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { DataBaseEntity } from 'src/constants';
import { Artist } from 'src/modules/artist/entities/artist.entity';
import { Album } from '../album/entities/album.entity';
import { Track } from '../track/entities/track.entity';

@Injectable()
export class FavsService {
  private defaultId: string = NIL_UUID;

  constructor(private readonly prisma: PrismaService) {
    this.prisma.favs.create({
      data: { id: this.defaultId },
    });
  }

  async findAll(): Promise<any> {
    try {
      return await this.prisma.favs.findUniqueOrThrow({
        where: { id: this.defaultId },
        include: {
          tracks: true,
          artists: true,
          albums: true,
        },
      });
    } catch (e) {
      this.prisma.handleErrors(e);
    }
  }

  // add(table: string, id: string): { message: string } {
  //   if (this.checkEntityExist(table, id)) {
  //     this.db.add([DataBaseEntity.FAVOURITES, table], { id });
  //   }
  //   return {
  //     message: `${
  //       table.charAt(0).toUpperCase() +
  //       table.slice(0, table.length - 1).slice(1)
  //     } with id ${id} successfully added to favorites`,
  //   };
  // }
  // remove(table: string, id: string): void {
  //   this.db.delete([DataBaseEntity.FAVOURITES, table], id);
  // }
  // private checkEntityExist(table: string, id: string): any {
  //   const entity = this.db.get([table, id]);
  //   if (!entity) {
  //     throw new UnprocessableEntityException(
  //       `${table.slice(0, table.length - 1)} with id ${id} not exist`,
  //     );
  //   }
  //   return !!entity;
  // }
  // private getEntitiesById<T>(entities: FavsDictionary, table: string): T[] {
  //   return Object.values(entities).map(({ id }) => this.db.get<T>([table, id]));
  // }
}
