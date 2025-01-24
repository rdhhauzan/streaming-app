import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { StreamingService } from './streaming.service';
import { CreateStreamingDto } from './dto/create-streaming.dto';
import { UpdateStreamingDto } from './dto/update-streaming.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('streaming')
export class StreamingController {
  constructor(private readonly streamingService: StreamingService) {}

  @Post("upload")
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: '/uploads',
        filename: (req, file, callback) => {
          const suffix = Date.now() + '-' + Math.round(Math.random() * 100000)
          const ext = file.originalname.split('.').pop()

          callback(null, `${suffix}.${ext}`)
        }
      })
    })
  )
  upload(@Body() createStreamingDto: CreateStreamingDto) {
    return this.streamingService.upload(createStreamingDto);
  }

  @Get()
  getAll() {
    return this.streamingService.getAll();
  }

}
