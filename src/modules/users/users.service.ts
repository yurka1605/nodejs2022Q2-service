import { ForbiddenException, Injectable } from '@nestjs/common';
import { compare, encrypt } from 'src/common/helpers/bcrypt';
import { PrismaService } from 'src/common/modules/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create({ login, password: pass }: CreateUserDto): Promise<User> {
    try {
      const password = await encrypt(pass);
      return await this.prisma.user.create({
        data: new User({ password, login }),
      });
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
      const isValidPassword = await compare(
        updateUserDto.oldPassword,
        user.password,
      );
      if (!isValidPassword) {
        throw new ForbiddenException();
      }

      const password = await encrypt(updateUserDto.newPassword);
      return await this.prisma.user.update({
        where: { id },
        data: {
          version: {
            increment: 1,
          },
          updatedAt: Date.now(),
          password,
          refreshToken: null,
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

  async findByLogin(login: string): Promise<User> {
    // TODO: Fix after check! Login must be unique!
    return await this.prisma.user.findFirst({ where: { login } });
  }

  async setRefreshToken(id: string, refreshToken: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { refreshToken },
    });
  }
}
