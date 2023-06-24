import { Controller, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from '../service/ImageService';

@Controller()
export class UploadController {
  constructor(private imageService: ImageService) {}

  @Post('upload/:userId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Param('userId') userId: string, @UploadedFile() file: Express.Multer.File) {
    console.log(userId);
    await this.imageService.saveImage(userId, file);
  }
}
