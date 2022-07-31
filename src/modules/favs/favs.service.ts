import { PrismaService } from 'src/common/modules/prisma/prisma.service';
import { NIL as NIL_UUID } from 'uuid';
import { Favs } from './entities/fav.entity';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { NotFoundError } from '@prisma/client/runtime';

@Injectable()
export class FavsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Omit<Favs, 'id'>> {
    try {
      return await this.prisma.favs.findUniqueOrThrow({
        where: { id: NIL_UUID },
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

  async add(table: string, id: string): Promise<{ message: string }> {
    try {
      await this.checkEntityExisting(table, id);

      await this.prisma[table].update({
        where: { id },
        data: {
          favsId: NIL_UUID,
        },
      });

      return {
        message: `${table} with id ${id} successfully added to favorites`,
      };
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
        },
      });
    } catch (e) {
      this.prisma.handleErrors(e);
    }
  }

  private async checkEntityExisting(
    table: string,
    id: string,
  ): Promise<boolean> {
    try {
      return await this.prisma[table].findUniqueOrThrow({
        where: { id },
        select: {
          favsId: true,
        },
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
}
