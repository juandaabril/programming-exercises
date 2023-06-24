import { Controller, Get, Param, StreamableFile } from '@nestjs/common';
import { ImageService } from '../service/ImageService';

@Controller()
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Get('image/:userId/:filename')
  async getImage(@Param('userId') userId: string, @Param('filename') filename: string): Promise<StreamableFile> {
    const stream = await this.imageService.getImageStream(userId, filename);

    return new StreamableFile(stream);
  }
}
