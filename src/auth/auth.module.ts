import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: "sadfgfnhmfdsdfsbmnvfdsdfsghmgfdasfsgh",
      signOptions: { expiresIn: "24h" },
      global: true
    })
  ]
})
export class AuthModule {}
