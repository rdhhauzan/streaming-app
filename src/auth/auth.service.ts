import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService, private jwtService: JwtService) {}
  async loginUser(data: LoginDto) {
    const { username, password } = data
    let payload = {}

    const findUserByUsername = await this.prismaService.user.findFirst({
      where: {
        username: username,
      }
    })

    if (!findUserByUsername) {
      return { status: 400, message: 'User not found' }
    }

    if (findUserByUsername) {
      const comparePassword = await bcrypt.compare(password, findUserByUsername.password)
      if (comparePassword) {
        payload = {
          username: findUserByUsername.username,
          id: findUserByUsername.id,
        }
      } else {
        return { status: 400, message: 'User not found' }
      }
    }

    return {
      status: 200,
      access_token: this.jwtService.sign(payload)
    }
  }

  async registerUser(body: LoginDto) {
    try {
      const { username, password } = body

      const userExists = await this.prismaService.user.findUnique({
        where : { username: username }
      })

      if (userExists) {
        throw new HttpException("User already exists", HttpStatus.BAD_REQUEST)
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const newUser = await this.prismaService.user.create({
        data: {
          username: username,
          password: hashedPassword
        }
      })

      return newUser
    } catch (error) {
      console.log(error)

      return error
    }

  }
}
