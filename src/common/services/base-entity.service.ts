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

  // remove(id: string): T {
  //   const removedEntity = this.db.delete<T>([this.dbTableName], id);
  //   if (!removedEntity) throw new NotFoundException();

  //   if (this.connections.length) {
  //     this.connections.forEach((table) =>
  //       this.removeRefer(table, id, this.connectionId),
  //     );
  //   }

  //   this.removeEntityFromFavourites(id);
  //   return removedEntity;
  // }

  // private removeRefer(tableName: string, id: string, idName: string): void {
  //   Object.values(this.db.get([tableName])).forEach((value) => {
  //     if (value?.[idName] === id) {
  //       value[idName] = null;
  //     }
  //   });
  // }

  // private removeEntityFromFavourites(id: string) {
  //   this.db.delete([DataBaseEntity.FAVOURITES, this.dbTableName], id);
  // }

  // protected checkRefers<T>(tables: string[], dto: Partial<T>) {
  //   tables.forEach((tableName) => {
  //     const id = dto[`${this.cutLastSymbol(tableName)}Id`];
  //     if (id) {
  //       this.checkReferId(id, tableName);
  //     }
  //   });
  // }

  // private checkReferId(id: string, tableName: string): void {
  //   if (!this.db.get([tableName, id])) {
  //     throw new BadRequestException(
  //       `${this.cutLastSymbol(tableName)} with id ${id} not exist`,
  //     );
  //   }
  // }

  // private cutLastSymbol(str: string): string {
  //   return str.slice(0, str.length - 1);
  // }
}
