import { get } from '../SQLiteDB';
import { Injectable } from '@nestjs/common';
import { User } from '../entity/User';

const FIND_BY_ID_QUERY = `SELECT id, name FROM user WHERE id = ?`;

@Injectable()
export class UserRepository {
  async findById(userId: string): Promise<User> {
    const result = await get<Result>(FIND_BY_ID_QUERY, [userId]);
    if (!result) {
      return null;
    }

    return new User(result.id, result.name);
  }
}

type Result = {
  id: string;
  name: string;
};
