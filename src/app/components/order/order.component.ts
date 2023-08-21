import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  selectedFilter: string = '';
  selectedItems: any[] = [];
  clientName: string = ''; // Adicione esta linha para armazenar o nome do cliente

  products = {
    'Hamburgueres': [
      { name: 'CuscuzBurger', price: 20 }
    ],
    'Café da Manhã': [
      { name: 'Cuscuz com Ovo', price: 15 },
      { name: 'Tapioca', price: 20 }
    ],
    'Bebidas': [
      { name: 'Café', price: 5 }
    ]
  };

  filter(filterType: string): void {
    this.selectedFilter = filterType;
    this.selectedItems = [];
  }

  addItem(item: any): void {
    this.selectedItems.push(item);
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


  sendOrder(): void {
    console.log('Pedido enviado:', {
      clientName: this.clientName,
      items: this.selectedItems
    });
  }
}
