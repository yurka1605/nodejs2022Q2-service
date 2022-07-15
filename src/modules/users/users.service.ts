import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { DataBaseEntity } from 'src/constants';
import { InMemoryDBService } from 'src/in-memory-db';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private db: InMemoryDBService) { }

  create(createUserDto: CreateUserDto): UserEntity {
    return this.db.add<UserEntity>(
      [DataBaseEntity.USERS],
      new UserEntity(createUserDto)
    );
  }

  findAll(): UserEntity[] {
    return Object.values(
      this.db.get<{ [key: string]: UserEntity }>([DataBaseEntity.USERS])
    );
  }

  findOne(id: string): UserEntity {
    const user = this.db.get<UserEntity>([DataBaseEntity.USERS, id]);
    if (!user) throw new NotFoundException();
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto): UserEntity {
    const user = this.findOne(id);

    if (!user) throw new NotFoundException();

    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException();
    }

    return this.db.update<UserEntity>(
      [DataBaseEntity.USERS, id],
      {
        password: updateUserDto.newPassword,
        version: user.version + 1,
        updatedAt: Date.now(),
      }
    );
  }

  remove(id: string): UserEntity {
    const deletedUser = this.db.delete<UserEntity>([DataBaseEntity.USERS], id);
    if (!deletedUser) throw new NotFoundException();
    return deletedUser;
  }
}
