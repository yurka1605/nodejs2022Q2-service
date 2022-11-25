import { ITokens } from './models/token';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Req,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
import { AuthDto } from './dto/auth.dto';
import { Request } from 'express';
import { RefreshTokenDto } from './dto/refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() authDto: AuthDto): Promise<User> {
    return new User(await this.authService.register(authDto));
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() { user }: Request): Promise<ITokens> {
    return this.authService.login(<Partial<User>>user);
  }

  @Post('refresh')
  async refresh(@Body() { refreshToken }: RefreshTokenDto): Promise<ITokens> {
    return this.authService.refresh(<string>refreshToken);
  }
}
