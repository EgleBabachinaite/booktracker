import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {HttpService} from '../../services/http/http.service';
import {Router} from '@angular/router';
import {User} from '../../../models/User';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less']
})
export class RegistrationComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(4)]);

  // Error flags
  showEmailError: boolean;
  showPasswordError: boolean;
  responseError: string;

  constructor(private http: HttpService, private router: Router) {
  }

  ngOnInit() {
  }

  register(): void {
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

      this.http.registerUser(user).subscribe({
        next: () => {
          this.router.navigate(['login']);
        },
        error: (err: HttpErrorResponse) => {

          switch (err.status) {
            case 409:
              this.responseError = 'Vartotojas su tokiu el. paštu jau egzistuoja';
              break;
            default:
              this.responseError = 'Registruojant vartotoją įvyko klaida';
              break;
          }
        }
      });
    }
  }
}
