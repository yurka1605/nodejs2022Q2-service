import { CreateUserDto } from './../dto/create-user.dto';
import { Exclude } from 'class-transformer';

export class User {
  id: string;
  login: string;
  version: number;
  createdAt: Date;
  updatedAt: Date;

  @Exclude()
  password: string;

  constructor(partial: CreateUserDto) {
    Object.assign(this, { ...partial });
  }
}
