import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  clientName: string = '';
  showErrorMessage: boolean = false;

  constructor(private router: Router) {}

  goToPedido(category: string): void {
    if (this.clientName.trim() === '') {
      this.showErrorMessage = true;
    } else {
      this.showErrorMessage = false;
      this.router.navigate(['/pedido', category]);
    }
  }

  goToLogin(): void {
    this.router.navigate(['/']); // Substitua '/login' pelo caminho correto da página de login
  }
}
