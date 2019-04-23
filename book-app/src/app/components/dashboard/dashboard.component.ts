import { Component, OnInit } from '@angular/core';
import {Book} from '../../../models/Book';
import {HttpService} from '../../services/http/http.service';
import {ContextService} from '../../services/context/context.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {User} from '../../../models/User';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {plainToClass} from 'class-transformer';
import {TableModule} from 'primeng/table';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
   books: Book[];
   book: Book;

  // Input value
  keyword: FormControl;
  constructor(private http: HttpService, private context: ContextService, private router: Router) {
  }

  ngOnInit() {
    this.books = [];

    this.loadBooks();

    this.http.getBooks().subscribe(
      (response: HttpResponse<any>) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );

    this.keyword = new FormControl('');
  }
  searchBooks(): void {
    console.log(this.keyword.value);
    const req = this.http.searchBooks(this.keyword.value)
      .subscribe(
        (results: Response) => {
          console.log(results);
          this.router.navigate(['book-list'], {state: {results: results}});
        },
        () => {
          console.log('Klaida siunčiant užklausą');
        }
      );
   }
  loadBooks(): void {
    this.http.getBooks().subscribe(
      (response: Book[]) => {
        this.books = plainToClass(Book, response);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        const book = new Book(this.book.id, this.book.title, this.book.author, this.book.page);
        this.books.push(book);
          }
    );
  }
  deleteBook(bookId: number): void {
    console.log(bookId);
    this.http.deleteBook(bookId).subscribe(
      (response: Book[]) => {
        for ( let i = 0; i < this.books.length; i++) {
          if (this.books[i].id === bookId) {
            this.books.splice(i, 1);
            return;
          }
       }
      }
    );
  }
}
