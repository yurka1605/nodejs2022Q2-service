import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/modules/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.prisma.user.create({ data: new User(createUserDto) });
    } catch (e) {
      this.prisma.handleErrors(e);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.prisma.user.findMany();
    } catch (e) {
      this.prisma.handleErrors(e);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      return await this.prisma.user.findUniqueOrThrow({ where: { id } });
    } catch (e) {
      this.prisma.handleErrors(e);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.findOne(id);
      if (user.password !== updateUserDto.oldPassword) {
        throw new ForbiddenException();
      }

      return await this.prisma.user.update({
        where: { id },
        data: {
          version: {
            increment: 1,
          },
          updatedAt: Date.now(),
          password: updateUserDto.newPassword,
        },
      });
    } catch (e) {
      this.prisma.handleErrors(e);
    }
  }

  async remove(id: string): Promise<User> {
    try {
      return await this.prisma.user.delete({ where: { id } });
    } catch (e) {
      this.prisma.handleErrors(e);
    }
  }
}
