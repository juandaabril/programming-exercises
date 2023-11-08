import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UploadController } from './controller/UploadController';
import { ImageService } from './service/ImageService';
import { UserRepository } from './repository/UserRepository';
import { UserPictureRepository } from './repository/UserPictureRepository';
import { ImageController } from './controller/ImageController';

@Module({
  imports: [HttpModule],
  controllers: [UploadController, ImageController],
  providers: [ImageService, UserRepository, UserPictureRepository],
})
export class AppModule {}
