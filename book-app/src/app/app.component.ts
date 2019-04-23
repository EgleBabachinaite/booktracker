import {Component, OnInit} from '@angular/core';
import {Book} from '../models/Book';

@Component({
  selector: 'app-main',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

// declaration area
export class AppComponent implements OnInit { // //called first time before the ngOnInit()
  // declaring variable (inserting property) -- property has name "books" and has a value of arrays of Book objects
  // books: Book[];
  // // showing only filtered books, who are stored into empty array.. prevents from removing books while filtering
  // // new variable declaration
  // filteredBooks: Book[];

  // // Input values
  // bookIdValue: number;
  // bookTitleValue: string;
  // bookAuthorValue: string;
  // bookPageValue: number;

  // tells books' position by an index  number
  // editedBookIndex: number;

  // ngOnInit is a life cycle hook called by Angular2 to indicate that Angular is done creating the component (from class)
  // We have to import OnInit in order to use like this (actually implementing OnInit is not mandatory but considered good practice)
  // ngOnInit() is better place to "start" - it's where/when components' bindings are resolved.
  ngOnInit(): void {  // implementation ..  called after the constructor and called  after the first ngOnChanges()
    // this.books has a value of an empty array
    // this.books = [];
    // this.filteredBooks has a value of this.books
    // this.filteredBooks = this.books;
  }
}
  // // adding a book -- || if at least one input value is missing, the book is returned back and not added to an array
  // addBook(): void {
  //   if (!this.bookIdValue || !this.bookTitleValue || !this.bookAuthorValue || !this.bookPageValue) {
  //     return;
  //   }

  //   // creates New object with arguments from Input Values
  //   const book = new Book(this.bookIdValue, this.bookTitleValue, this.bookAuthorValue, this.bookPageValue);
  //   // empties Input areas after adding a book
  //   this.bookIdValue = 0;
  //   this.bookTitleValue = '';
  //   this.bookAuthorValue = '';
  //   this.bookPageValue = 0;
  //
  //   // book is pushed into books array
  //   this.books.push(book);
  //   console.log(this.books);
  // }

  // // deleting book by its' ID
  //   deleteBookById(bookId: number): void {
  //   // looping through every book in whole this.books array
  //   for (let i = 0; i < this.books.length; i++) {
  //     // if book in array in place i id matches book id acquired as function argument
  //     if (this.books[i].id === bookId) {
  //       // using a function and passing index place
  //       this.deleteBookByIndex(i);
  //       return;
  //     }
  //   }
  // }

  // // book is deleted from array
  // deleteBookByIndex(bookIndex: number): void {
  //   this.books.splice(bookIndex, 1);
  // }
  //
  // // editing book by an index
  // initEdit(bookIndex: number): void {
  //   // set (setting is needed for another method) -- index of a book which is currently being edited
  //   this.editedBookIndex = bookIndex;
  //
  //   // setting input values to currently being edited books values
  //   this.bookTitleValue = this.books[bookIndex].title;
  //   this.bookAuthorValue = this.books[bookIndex].author;
  //   this.bookPageValue = this.books[bookIndex].page;
  // }

  // // Editing book
  // editBook(): void {
  //   // variable book is set to currently being edited book -- edited book index is acquired from previous function method
  //   const book = this.books[this.editedBookIndex];
  //
  //   // book properties are set to Input Values
  //   book.title = this.bookTitleValue;
  //   book.author = this.bookAuthorValue;
  //   book.page = this.bookPageValue;
  //
  //   // manipulating with buttons "html" -- creating or editing state
  //   this.editedBookIndex = undefined;
  // }}

  // romanai(): void {
  //   // romanai variable is set to an empty Book array
  //   const romanai: Book [] = [];
  //
  //   // iterate all books
  //   for (const book of this.books) {
  //     if (book.genre === 'romanas') {
  //       // push book to romanai array
  //       romanai.push(book);
  //     }
  //   }
  //   // this.filteredBooks are set to romanai -- filteredBooks is used in view 'html'
  //   this.filteredBooks = romanai;
  // }
  //
  // monografijos(): void {
  //   const monografijos: Book [] = [];
  //
  //   for (const book of this.books) {
  //     if (book.genre === 'monografija') {
  //       monografijos.push(book);
  //     }
  //   }
  //   this.filteredBooks = monografijos;
  // }
  //
  // visosKnygos(): void {
  //   this.filteredBooks = thi
