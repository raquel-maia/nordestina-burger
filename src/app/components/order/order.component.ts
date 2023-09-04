import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  items: any[] = [];
  destinoItems: any[] = [];
  type: string = 'hamburgueres';
  clientName: string = '';
  showErrorMessage: boolean = false;

  constructor(
    private dataService: ProductsService,
    private router: Router
  ) {}

  onClick(param: string) {
    this.type = param;
    this.dataService.getItems().subscribe((data: any) => {
      this.items = data.filter((item: any) => item.type === this.type);
    });
  }
  

  moverItem(item: any) {
    const itemCopy = { ...item, quantity: 1 };
    this.destinoItems.push(itemCopy);
  }

  incrementQuantity(item: any) {
    item.quantity++;
  }

  decrementQuantity(item: any) {
    if (item.quantity > 0) {
      item.quantity--;
    }
  }

  removeItem(product: any) {
    const index = this.destinoItems?.indexOf(product);
    if (index !== undefined && index !== -1) {
      this.destinoItems?.splice(index, 1);
      this.calcularQuantidadeTotal();
    }
  }

  calcularQuantidadeTotal(): number {
    return this.destinoItems.reduce((total, item) => total + (item.quantity * item.price), 0);
  }

  ngOnInit(): void {
    this.dataService.getItems().subscribe((data: any) => {
      this.items = data.filter((item: any) => item.type === this.type);
    });
    
  }

  goToLogin(): void {
    this.router.navigate(['/']);
  }

  enviar() {
    if (this.clientName.trim() === '') {
      this.showErrorMessage = true;
    } else {
      this.showErrorMessage = false;
      // Atualizar depois para página de cozinha
      this.router.navigate(['/cardapio']);
    }
  }

}