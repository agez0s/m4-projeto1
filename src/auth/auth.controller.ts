import { User } from '@prisma/client';
import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import AuthUser from './authuser';
import { CredentialsDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dados: CredentialsDto) {
    return this.authService.login(dados);
  }

  @UseGuards(AuthGuard())
  @Get('profile')
  profile(@AuthUser() user: User): User {
    return user;
  }
}
