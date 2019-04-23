import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../services/http/http.service';
import {Router} from '@angular/router';
import {Book} from '../../../models/Book';
import {ContextService} from '../../services/context/context.service';
import {User} from '../../../models/User';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.less']
})
export class BookListComponent implements OnInit {
  books: Book[];

  constructor(private http: HttpService, private context: ContextService, private router: Router) {
    // https://stackoverflow.com/questions/54891110/router-getcurrentnavigation-always-returns-null
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state;
    console.log(state);
    this.books = [];
    this.booksFilter(state);
    console.log(this.books);
  }

  ngOnInit() {
  }

  booksFilter(amazonResults: any) {
    // response structure
    console.log(amazonResults.results);
    // console.log(amazonResults.results);
    for (const result of amazonResults.results) {
      // https://stackoverflow.com/questions/2281633/javascript-isset-equivalent
        if (typeof result.ItemAttributes[0].ISBN !== 'undefined'
          && typeof result.ItemAttributes[0].Title !== 'undefined'
          && typeof result.ItemAttributes[0].Author !== 'undefined'
          && typeof result.ItemAttributes[0].NumberOfPages !== 'undefined') {

          const book = new Book(result.ItemAttributes[0].ISBN[0], result.ItemAttributes[0].Title[0],
            result.ItemAttributes[0].Author[0], result.ItemAttributes[0].NumberOfPages[0]);
          console.log(book);
          this.books.push(book);
        }
    }
  }

  addBook(book): void {
    console.log(book);

    this.http.addBook(book)
      .subscribe(
        () => {
            console.log('Knyga pridėta');
            this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.log(error);
          console.log('Klaida pridedant knygą');
        }
      );
  }
}
