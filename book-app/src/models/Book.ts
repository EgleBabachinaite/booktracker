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

// source: https://stackoverflow.com/questions/35763730/difference-between-constructor-and-ngoninit
// source: https://blog.angularindepth.com/the-essential-difference-between-constructor-and-ngoninit-in-angular-c9930c209a42
