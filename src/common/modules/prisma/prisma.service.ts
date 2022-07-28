import {
  INestApplication,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { NotFoundError } from '@prisma/client/runtime';
import { PrismaCodes } from './prisma.model';

@Injectable()
export class PrismaService extends PrismaClient {
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  handleErrors(e: Error): void {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      switch (e.code) {
        case PrismaCodes.NotFound:
          throw new NotFoundException();

        default:
          throw e;
      }
    }

    if (e instanceof NotFoundError) {
      throw new NotFoundException();
    }

    throw e;
  }
}
