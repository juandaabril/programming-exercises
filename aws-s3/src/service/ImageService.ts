import { v4 as uuidv4 } from 'uuid';
import { UserRepository } from '../repository/UserRepository';
import { UserPictureRepository } from '../repository/UserPictureRepository';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { UserPicture } from '../entity/UserPicture';
import { ReadStream } from 'fs';

@Injectable()
export class ImageService {
  constructor(private userRepository: UserRepository, private userPictureRepository: UserPictureRepository) {}
  async saveImage(userId: string, file: Express.Multer.File): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const picture = await this.userPictureRepository.findByUserIdAndName(userId, file.originalname);
    if (picture) {
      throw new BadRequestException('the file already exits for that user');
    }

    const filename = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(__dirname, '..', 'pictures', filename);
    const userPicture = new UserPicture(uuidv4(), user.id, file.originalname, filePath);
    const folderPath = path.dirname(filePath);

    // Create the folder if it doesn't exist
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    //write to disk
    await fs.promises.writeFile(filePath, file.buffer);

    //save in db
    await this.userPictureRepository.save(userPicture);
  }

  async getImageStream(userId: string, filename: string): Promise<ReadStream> {
    const picture = await this.userPictureRepository.findByUserIdAndName(userId, filename);
    if (!picture) {
      throw new NotFoundException('file not found');
    }

    const filePath = picture.url;

    return fs.createReadStream(filePath);
  }
}
