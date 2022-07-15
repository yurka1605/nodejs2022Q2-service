import { Injectable } from "@nestjs/common";
import { initialDataBase } from "./constants";

type baseDataType = { id: string };

interface ICollection<T> {
  [key: string]: T,
};

export interface IDbState {
  [key: string]: ICollection<any>;
}

@Injectable()
export class InMemoryDBService {
  private db: IDbState = initialDataBase;

  public get<T>(keys: string[]): T | null {
    return <T>keys.reduce((obj: any, key: string) => obj[key], this.db);
  }

  public add<T extends baseDataType>(keys: string[], obj: T): T | null {
    const collection = this.get<ICollection<T>>(keys);
    collection[obj.id] = obj;
    return collection[obj.id];
  }

  public update<T extends baseDataType>(keys: string[], obj: Partial<T>): null | T {
    const updatedObj = this.get<T>(keys);

    if (!updatedObj) {
      return null;
    }

    Object.entries(obj).forEach(
      ([key, value]: [string, keyof Partial<T>]) => updatedObj[key] = value
    );
    return updatedObj;
  }

  public delete<T>(keys: string[], id: string): null | T {
    const collection = this.get<ICollection<T>>(keys);

    if (!collection[id]) {
      return null;
    }

    const deletedEntity = Object.assign({}, collection?.[id]);
    delete collection[id];
    return deletedEntity;
  }
}