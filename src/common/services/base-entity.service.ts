import { baseDataType } from './../../in-memory-db';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InMemoryDBService } from 'src/in-memory-db';
import { DataBaseEntity } from 'src/constants';

interface EntityConstructor<T> {
  new(entity: Partial<T>): T;
}

export abstract class EntityService<T extends baseDataType> {
  protected readonly db: InMemoryDBService;
  protected dbTableName: string;
  protected EntityConstructor: EntityConstructor<T>;
  private connections: string[];
  private connectionId: string;

  constructor(
    db: InMemoryDBService,
    dbTableName: string,
    EntityConstructor: EntityConstructor<T>,
    connections: string[] = [],
    connectionId = '',
  ) {
    this.db = db;
    this.dbTableName = dbTableName;
    this.connections = connections;
    this.connectionId = connectionId;
    this.EntityConstructor = EntityConstructor;
  }

  create(createDto: Partial<T>): T {
    return this.db.add<T>([this.dbTableName], new this.EntityConstructor(createDto));
  }

  findAll(): T[] {
    return Object.values(this.db.get<{ [key: string]: T }>([this.dbTableName]));
  }

  findOne(id: string): T {
    const entity = this.db.get<T>([this.dbTableName, id]);
    if (!entity) throw new NotFoundException();
    return entity;
  }

  update(id: string, updateDto: Partial<T>): T {
    const entity = this.findOne(id);
    if (!entity) throw new NotFoundException();
    return this.db.update<T>(
      [this.dbTableName, id],
      updateDto
    );
  }

  remove(id: string): T {
    const removedEntity = this.db.delete<T>([this.dbTableName], id);
    if (!removedEntity) throw new NotFoundException();

    if (this.connections.length) {
      this.connections.forEach(table => this.removeRefer(table, id, this.connectionId));
    }

    this.removeEntityFromFavourites(id);
    return removedEntity;
  }

  private removeRefer(tableName: string, id: string, idName: string): void {
    Object.values(
      this.db.get([tableName])
    ).forEach(value => {
      if (value?.[idName] === id) {
        value[idName] = null;
      }
    });
  }

  private removeEntityFromFavourites(id: string) {
    this.db.delete([DataBaseEntity.FAVOURITES, this.dbTableName], id);
  }

  protected checkRefers<T>(tables: string[], dto: Partial<T>) {
    tables.forEach(tableName => {
      const id = dto[`${this.cutLastSymbol(tableName)}Id`];
      if (id) {
        this.checkReferId(id, tableName);
      }
    });
  }

  private checkReferId(id: string, tableName: string): void {
    if (!this.db.get([tableName, id])) {
      throw new BadRequestException(
        `${this.cutLastSymbol(tableName)} with id ${id} not exist`
      );
    }
  }

  private cutLastSymbol(str: string): string {
    return str.slice(0, str.length - 1);
  }
}