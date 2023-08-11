import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Certifique-se de ter importado o Router corretamente

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  clientName: string = '';

  constructor(private router: Router) {} // Certifique-se de que o Router esteja injetado corretamente

  goToPedido(category: string): void {
    this.router.navigate(['/pedido', category]);
  }
}

