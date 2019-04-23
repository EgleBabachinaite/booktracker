import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, Routes, UrlTree} from '@angular/router';
import {RegistrationComponent} from '../app/components/registration/registration.component';
import {LoginComponent} from '../app/components/login/login.component';
import {AppComponent} from '../app/app.component';
import {DashboardComponent} from '../app/components/dashboard/dashboard.component';
import {Injectable} from '@angular/core';
import {ContextService} from '../app/services/context/context.service';
import {Observable} from 'rxjs';
import {AddBookComponent} from '../app/components/add-book/add-book.component';
import {BookListComponent} from '../app/components/book-list/book-list.component';

@Injectable()
export class CanActivateUser implements CanActivate {
  constructor(private context: ContextService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.context.user) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}

export const routesConfig: Routes = [
  {path: 'register', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [CanActivateUser]},
  {path: 'add-book', component: AddBookComponent, canActivate: [CanActivateUser]},
  {path: 'books', component: AppComponent, canActivate: [CanActivateUser]},
  {path: 'book-list', component: BookListComponent, canActivate: [CanActivateUser]},
  {path: '**', component: LoginComponent}
];
