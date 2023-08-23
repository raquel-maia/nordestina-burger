import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';// Verifique o caminho correto para ProductService

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  selectedFilter: string = '';
  selectedItems: any[] = [];
  clientName: string = '';
  products: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedFilter = params['filter'];
    });

    // Obter produtos da API
    this.productService.getItems().subscribe(
      (productsResponse: any) => {
        this.products = productsResponse;
        console.log('Products:', this.products);
      },
      (error: any) => {
        console.error('Erro ao obter produtos:', error);
      }
    );
  }

  addItem(item: any): void {
    const selectedItem = { ...item, quantity: 1 };
    this.selectedItems.push(selectedItem);
  }

  removeItem(item: any): void {
    const index = this.selectedItems.indexOf(item);
    if (index !== -1) {
      this.selectedItems.splice(index, 1);
    }
  }

  calculateTotal(): number {
    return this.selectedItems.reduce((total, item) => total + item.price, 0);
  }

  selectFilter(filter: string): void {
    this.selectedFilter = filter;
    this.selectedItems = []; // Limpar os itens selecionados
  }

  goToLogin(): void {
    this.router.navigate(['/']); 
  }

  sendOrder(): void {
    console.log('Pedido enviado:', {
      clientName: this.clientName,
      items: this.selectedItems
    });
  }
}
