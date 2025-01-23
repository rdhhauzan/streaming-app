import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async loginUser(@Body() body: LoginDto) {
    return this.authService.loginUser(body);
  }

  @Post('register')
  async registerUser(@Body() body: LoginDto) {
    return this.authService.registerUser(body);
  }
}
