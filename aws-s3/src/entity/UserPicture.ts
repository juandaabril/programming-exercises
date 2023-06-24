export class UserPicture {
  id: string;
  userId: string;
  name: string;
  url: string;

  constructor(id: string, userId: string, name: string, url: string) {
    this.id = id;
    this.userId = userId;
    this.name = name;
    this.url = url;
  }
}
