import { Exclude } from 'class-transformer';

export class User {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  @Exclude()
  password: string;

  constructor({ createdAt, updatedAt, ...partial }: Partial<User>) {
    let now: number;
    if (!createdAt) {
      now = Date.now();
    }

    Object.assign(this, {
      ...partial,
      createdAt: createdAt ?? now,
      updatedAt: updatedAt ?? now,
    });
  }
}
