import { UserPicture } from '../entity/UserPicture';
import { get, run } from '../SQLiteDB';
import { Injectable } from '@nestjs/common';

const SAVE_QUERY = `INSERT INTO user_picture (id, user_id, name, url) VALUES (?, ?, ?, ?);`;
const FIND_BY_USER_ID_AND_NAME_QUERY = `SELECT id, user_id, name, url FROM user_picture WHERE user_id = ? and name = ?`;

@Injectable()
export class UserPictureRepository {
  save(picture: UserPicture): Promise<void> {
    return run(SAVE_QUERY, [picture.id, picture.userId, picture.name, picture.url]);
  }
  async findByUserIdAndName(userId: string, name: string): Promise<UserPicture> {
    const result = await get<Result>(FIND_BY_USER_ID_AND_NAME_QUERY, [userId, name]);
    if (!result) {
      return null;
    }

    return new UserPicture(result.id, result.user_id, result.name, result.url);
  }
}

type Result = {
  id: string;
  user_id: string;
  name: string;
  url: string;
};
