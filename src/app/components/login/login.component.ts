import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  showUsernameError: boolean = false;
  showEmailError: boolean = false;

  constructor(private router: Router) {}

  onSubmit() {
    this.showUsernameError = false;
    this.showEmailError = false;

    if (this.username.trim() === '') {
      this.showUsernameError = true;
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.showEmailError = true;
      return;
    }

    this.router.navigate(['/cardapio']);
  }

  private isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }
}
