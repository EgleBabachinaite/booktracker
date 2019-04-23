import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {HttpService} from '../../services/http/http.service';
import {User} from '../../../models/User';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {ContextService} from '../../services/context/context.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(4)]);

  // Error flags
  showEmailError: boolean;
  showPasswordError: boolean;
  responseError: string;

  constructor(private http: HttpService, private router: Router, private context: ContextService) {
  }

  ngOnInit() {
  }

  login(): void {
    this.showEmailError = false;
    this.showPasswordError = false;

    if (!this.email.valid) {
      this.showEmailError = true;
    }

    if (!this.password.valid) {
      this.showPasswordError = true;
    }

    if (this.email.valid && this.password.valid) {

      const user = new User();
      user.email = this.email.value;
      user.password = this.password.value;

      this.http.loginUser(user).subscribe({
        next: (response: User) => {
          this.context.user = response;

          this.router.navigate(['dashboard']);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);

          switch (err.status) {
            case 400:
            case 401:
              this.responseError = 'Neteisingas el. paštas arba slaptažodis';
              break;
            default:
              this.responseError = 'Nepavyko prisijungti...';
              break;
          }
        }
      });
    }
  }
}
