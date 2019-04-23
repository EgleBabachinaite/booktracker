import { Injectable } from '@angular/core';
import {User} from '../../../models/User';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  private userData: User;
  set user(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.userData = user;
  }
  get user() {
    return this.userData;
  }
  constructor(private router: Router) {
    // Getting user from local storage
    const userString = localStorage.getItem('user');

    if (userString) {
      this.userData = JSON.parse(userString);
    }
  }

  logout(): void {
    this.user = undefined;
    localStorage.setItem('user', '');

    this.router.navigate(['login']);
  }
}
