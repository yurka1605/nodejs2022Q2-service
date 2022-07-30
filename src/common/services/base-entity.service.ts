import { PrismaService } from '../modules/prisma/prisma.service';

interface EntityConstructor<T> {
  new (entity: Partial<T>): T;
}

export abstract class EntityService<T> {
  protected readonly prisma: PrismaService;
  protected dbTableName: string;
  protected EntityConstructor: EntityConstructor<T>;

  constructor(
    prisma: PrismaService,
    dbTableName: string,
    EntityConstructor: EntityConstructor<T>,
  ) {
    this.prisma = prisma;
    this.dbTableName = dbTableName;
    this.EntityConstructor = EntityConstructor;
  }

  async create(createDto: Partial<T>): Promise<T> {
    try {
      return await this.prisma[this.dbTableName].create({
        data: new this.EntityConstructor(createDto),
      });
    } catch (e) {
      this.prisma.handleErrors(e);
    }
  }

  async findAll(): Promise<T[]> {
    try {
      return await this.prisma[this.dbTableName].findMany();
    } catch (e) {
      this.prisma.handleErrors(e);
    }
  }

  async findOne(id: string): Promise<T> {
    try {
      return await this.prisma[this.dbTableName].findUniqueOrThrow({
        where: { id },
      });
    } catch (e) {
      this.prisma.handleErrors(e);
    }
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    try {
      return await this.prisma[this.dbTableName].update({
        where: { id },
        data,
      });
    } catch (e) {
      this.prisma.handleErrors(e);
    }
  }

  async remove(id: string): Promise<T> {
    try {
      return await this.prisma[this.dbTableName].delete({ where: { id } });
    } catch (e) {
      this.prisma.handleErrors(e);
    }
  }
}
