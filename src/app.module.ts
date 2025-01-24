import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { StreamingModule } from './streaming/streaming.module';

@Module({
  imports: [AuthModule, StreamingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
