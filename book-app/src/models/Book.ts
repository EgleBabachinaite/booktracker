import {Type} from 'class-transformer';
import {User} from './User';

export class Book {
  id: number;
  title: string;
  author: string;
  page: number;

  @Type(() => User)
  users?: User[];

  constructor(id: number, title: string, author: string, page: number) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.page = page;
  }
}
