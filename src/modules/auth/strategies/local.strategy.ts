import { ForbiddenException, Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'login', passwordField: 'password' });
  }

  async validate(login: string, password: string): Promise<Partial<User>> {
    const user = await this.authService.validateUser({ login, password });
    if (!user) throw new ForbiddenException('No user with such data');
    return user;
  }
}
