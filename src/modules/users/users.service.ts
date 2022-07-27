import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/common/modules/prisma/prisma.service';
import { DataBaseEntity } from 'src/constants';
import { InMemoryDBService } from 'src/in-memory-db';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private db: InMemoryDBService, private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({ data: new User(createUserDto) });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    // const password = updateUserDto.oldPassword;
    // return this.prisma.user.update({
    //   where: {
    //     id,
    //     password
    //   },
    //   data: {
    //     version: {
    //       increment: 1,
    //     },
    //     password: updateUserDto.newPassword,
    //   },
    // });

    // if (user.password !== updateUserDto.oldPassword) {
    //   throw new ForbiddenException();
    // }

    return this.db.update<User>([DataBaseEntity.USERS, id], {
      password: updateUserDto.newPassword,
      version: 1,
    });
  }

  remove(id: string): User {
    const deletedUser = this.db.delete<User>([DataBaseEntity.USERS], id);
    if (!deletedUser) throw new NotFoundException();
    return deletedUser;
  }
}
