import { compare, encrypt } from 'src/common/helpers/bcrypt';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { User } from './../users/entities/user.entity';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ITokenPayload, ITokens } from './models/token';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ login, password }: CreateUserDto): Promise<User> {
    const user = await this.usersService.findByLogin(login);

    if (user) {
      throw new ConflictException(`User with login ${login} already exist!`);
    }

    return new User(await this.usersService.create({ login, password }));
  }

  async validateUser({
    login,
    password: pass,
  }: CreateUserDto): Promise<Partial<User> | null> {
    const user = await this.usersService.findByLogin(login);
    const isValid = user ? await compare(pass, user.password) : false;

    if (isValid) {
      const { password, ...result } = user;
      return result;
    } else {
      return null;
    }
  }

  async login({ id: sub, login }: Partial<User>): Promise<ITokens> {
    const tokens = this.getTokens({ sub, login });
    await this.setNewRefreshToken(sub, tokens.refreshToken);
    return tokens;
  }

  async refresh(token: string): Promise<ITokens> {
    try {
      const { sub } = await this.verifyToken(token);
      const user = await this.usersService.findOne(sub);
      const isValidToken = user?.refreshToken
        ? await compare(token, user?.refreshToken)
        : false;

      if (!isValidToken) {
        throw new ForbiddenException('Token is invalid');
      }

      const tokens = this.getTokens({ sub, login: user.login });
      await this.setNewRefreshToken(sub, tokens.refreshToken);

      return tokens;
    } catch (e) {
      throw new ForbiddenException(e.message);
    }
  }

  private async setNewRefreshToken(id: string, token: string): Promise<void> {
    const encryptedRefreshToken = await encrypt(token);
    await this.usersService.setRefreshToken(id, encryptedRefreshToken);
  }

  private verifyToken(token: string) {
    return this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
    });
  }

  private getTokens(payload: ITokenPayload): ITokens {
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });

    return { accessToken, refreshToken };
  }
}
