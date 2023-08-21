import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  private loginSubscription: Subscription | undefined;
  public errorMessage: string | undefined;
  public emailError: boolean = false;
  public passwordError: boolean = false;

  constructor(
    private readonly service: LoginService,
    private readonly router: Router,
    private readonly localStorageService: LocalStorageService
  ) {}

  onSubmit() {
    // Reset previous error flags and messages
    this.errorMessage = undefined;
    this.emailError = false;
    this.passwordError = false;

    // Check if email and password are provided
    if (!this.email) {
      this.emailError = true;
    } else if (!this.validateEmail(this.email)) {
      this.emailError = true;
      return;
    }
    if (!this.password) {
      this.passwordError = true;
    }

    // If there are errors, exit
    if (this.emailError || this.passwordError) {
      return;
    }

    this.loginSubscription = this.service.login(this.email, this.password).subscribe({
      next: (response: any) => {
        console.log(response);
        console.log('accessToken:', response.accessToken);
        if (response.accessToken && response.user && response.user.role) {
          this.localStorageService.setItem('user_data', response.user);
          this.localStorageService.setItem('accessToken', response.accessToken);
          switch (response.user.role) {
            case 'atendente':
              this.router.navigate(['/cardapio']);
              break;
            default:
              console.error('Função de usuário inválida:', response.user.role);
          }
        }
      },
      error: (error: any) => {
        console.error('falha no login:', error);
        if (error.status === 400) {
          this.errorMessage = 'Senha incorreta';
        } else if (error.status === 404) {
          this.errorMessage = 'Usuário inexistente';
        } else {
          this.errorMessage = 'Erro desconhecido';
        }
      }
    });
  }

  validateEmail(email: string): boolean {
    // Email regex pattern
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }
}
