import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../../models/User';
import {ContextService} from '../context/context.service';
import {Book} from '../../../models/Book';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private url = environment.restUrl;

  constructor(private http: HttpClient, private context: ContextService) {
  }

  private get(path: string, headers?: HttpHeaders): Observable<any> {
    return this.http.get(this.url + path, {
      headers: headers
    });
  }

  private post(path: string, body: any, headers?: HttpHeaders): Observable<any> {
    return this.http.post(this.url + path, body, {
      headers: headers
    });
  }

  private put(path: string, body: any, headers?: HttpHeaders): Observable<any> {
    return this.http.put(this.url + path, body, {
      headers: headers
    });
  }

  private delete(path: string, body: any, headers?: HttpHeaders): Observable<any> {
    return this.http.delete(this.url + path, {
      headers: headers
    });
  }

  registerUser(user: User): Observable<any> {
    return this.post('/user', user);
  }

  loginUser(user: User): Observable<any> {
    return this.post('/login', user);
  }

  private generateAuthorizationHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    // add token to headers
    return headers.append('Authorization', `Bearer ${this.context.user.token}`);
  }

  searchBooks(keyword: string): Observable<object> {
    const headers = this.generateAuthorizationHeaders();
    // https://stackoverflow.com/questions/34475523/how-to-pass-url-arguments-query-string-to-a-http-request-on-angular
    // return this.post('/amazon', {params: {keyword: keyword}}, headers);
    return this.post('/amazon', {keyword: keyword}, headers);
  }
  addBook(book: Book): Observable<object> {
    const headers = this.generateAuthorizationHeaders();
    const user = localStorage.getItem('user');
    const user1 = JSON.parse(user);
    console.log(user);
    console.log(user1.id);
    return this.post('/book', {book, userId: user1.id}, headers);
  }
  getBooks(): Observable<object> {
    const headers = this.generateAuthorizationHeaders();

    return this.get('/book', headers);
  }
  deleteBook(bookId: number): Observable<object> {
    const headers = this.generateAuthorizationHeaders();

    return this.delete(`/book/${bookId}`, headers);
  }
}

