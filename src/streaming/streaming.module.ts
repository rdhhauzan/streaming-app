import { Module } from '@nestjs/common';
import { StreamingService } from './streaming.service';
import { StreamingController } from './streaming.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [StreamingController],
  providers: [StreamingService],
  imports: [PrismaModule]
})
export class StreamingModule {}
