import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const credentials = btoa(`${this.username}:${this.password}`);
    const headers = { Authorization: `Basic ${credentials}` };

    this.http
      .post(
        'https://dev.supracontrol.com:8080/api/user/authenticate/',
        {},
        { headers, observe: 'response' }
      )
      .subscribe({
        next: (response) => {
          const token = response.headers.get('Token');
          if (token) {
            localStorage.setItem('token', token);
            this.router.navigate(['/users']);
          } else {
            this.errorMessage = 'Neuspješna prijava. Token nije pronađen.';
          }
        },
        error: () => {
          this.errorMessage = 'Neuspješna prijava. Provjerite podatke.';
        },
      });
  }
}
