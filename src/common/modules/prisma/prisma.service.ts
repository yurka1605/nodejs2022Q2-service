import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
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
        case PrismaCodes.NotFoundForeignKey:
          const keyName =
            (e?.meta?.field_name as string)?.split('_')[1] || null;
          throw new NotFoundException(
            `Entity with current ${keyName} doesn't exist`,
          );
      case PrismaCodes.AlreadyExist:
        throw new BadRequestException(
          `Entity with this id already exist`,
        );

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
