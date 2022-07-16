import { CreateUserDto } from './../dto/create-user.dto';
import { Exclude } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';

export class UserEntity {
  id: string;
  login: string;
  version?: number;
  createdAt?: number;
  updatedAt?: number;

  @Exclude()
  password: string;

  constructor(partial: CreateUserDto) {
    const now = Date.now();
    Object.assign(this, {
      id: uuidv4(),
      ...partial,
      version: 1,
      createdAt: now,
      updatedAt: now,
    });
  }
}
