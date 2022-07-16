import { baseDataType } from './../../in-memory-db';
import { NotFoundException } from '@nestjs/common';
import { InMemoryDBService } from 'src/in-memory-db';

interface EntityConstructor<T> {
  new(entity: Partial<T>): T;
}

export abstract class EntityService<T extends baseDataType> {
  protected readonly db: InMemoryDBService;
  protected dbTableName: string;
  protected EntityConstructor: EntityConstructor<T>;

  constructor(
    db: InMemoryDBService,
    dbTableName: string,
    EntityConstructor: EntityConstructor<T>
  ) {
    this.db = db;
    this.dbTableName = dbTableName;
    this.EntityConstructor = EntityConstructor;
  }

  create(createDto: Partial<T>): T {
    return this.db.add<T>(
      [this.dbTableName],
      new this.EntityConstructor(createDto)
    );
  }

  findAll(): T[] {
    return Object.values(
      this.db.get<{ [key: string]: T }>([this.dbTableName])
    );
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
    const deletedEntity = this.db.delete<T>([this.dbTableName], id);
    if (!deletedEntity) throw new NotFoundException();
    return deletedEntity;
  }
}