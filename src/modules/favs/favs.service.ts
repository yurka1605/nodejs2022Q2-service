import { PrismaService } from 'src/common/modules/prisma/prisma.service';
import { NIL as NIL_UUID } from 'uuid';
import { Favs } from './entities/fav.entity';
import { BadRequestException, Injectable, Logger, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { DataBaseEntity } from 'src/constants';
import { Artist } from 'src/modules/artist/entities/artist.entity';
import { Album } from '../album/entities/album.entity';
import { Track } from '../track/entities/track.entity';
import { Prisma } from '@prisma/client';
import { NotFoundError } from '@prisma/client/runtime';

@Injectable()
export class FavsService {
  private defaultId: string = NIL_UUID;

  constructor(private readonly prisma: PrismaService) {
    this.init()
      .then(data => Logger.log('Favs db initialised', 'INIT'))
      .catch(e => Logger.error('something wrong', 'INIT'));
  }

  async findAll(): Promise<any> {
    try {
      return await this.prisma.favs.findUniqueOrThrow({
        where: { id: this.defaultId },
        select: {
          tracks: {
            select: {
              id: true,
              name: true,
              artistId: true,
              albumId: true,
              duration: true,
            },
          },
          artists: {
            select: {
              id: true,
              name: true,
              grammy: true,
            },
          },
          albums: {
            select: {
              id: true,
              name: true,
              year: true,
              artistId: true,
            },
          },
        },
      });
    } catch (e) {
      this.prisma.handleErrors(e);
    }
  }

  async add(table: string, id: string): Promise<{ message: string; }> {
    try {
      await this.checkEntityExisting(table, id);

      await this.prisma[table].update({
        where: { id },
        data: {
          favsId: this.defaultId
        }
      });

      return { message: `${table} with id ${id} successfully added to favorites` };
    } catch (e) {
      this.prisma.handleErrors(e);
    }
  }

  async remove(table: string, id: string): Promise<void> {
    try {
      return await this.prisma[table].update({
        where: { id },
        data: {
          favsId: null,
        }
      });
    } catch (e) {
      this.prisma.handleErrors(e);
    }
  }

  private async checkEntityExisting(table: string, id: string): Promise<boolean> {
    try {
      return await this.prisma[table].findUniqueOrThrow({
        where: { id },
        select: {
          favsId: true,
        }
      });
    } catch (e) {
      if (e instanceof NotFoundError) {
        throw new UnprocessableEntityException(
          `${table} with id ${id} not exist`,
        );
      }

      this.prisma.handleErrors(e);
    }
  }

  private async init(): Promise<void> {
    try {
      await this.findAll();
    } catch (error) {
      await this.prisma.favs.create({ data: { id: this.defaultId} });
    }
  }
}
