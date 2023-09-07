import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { OrderService } from 'src/app/services/orders/orders.service';
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
  isClientNameEntered: boolean = false;
  showErrorMessage: boolean = false;
  garcon:any={};
  errorMessage:string = '';


  constructor(
    private dataService: ProductsService,
    private router: Router,
    private storage: LocalStorageService,
    private orderService: OrderService,
  ) {}

  onClick(param: string) {
    this.type = param;
    this.dataService.getItems().subscribe((data: any) => {
      this.items = data.filter((item: any) => item.type === this.type);
    });
  }

  addToCart(item: any) {
    console.log(item);
    const cartItemIndex = this.destinoItems.findIndex(cartItem => cartItem.id === item.id);
    console.log(cartItemIndex)
    if (cartItemIndex === -1) {
      const cartItem = { ...item, quantity: 1 };
      this.destinoItems.push(cartItem);
    } else {
      this.destinoItems[cartItemIndex].quantity++;
    }
    console.log(this.destinoItems)
  }
  

  moverItem(item: any) {
    const itemCopy = { ...item, quantity: 0 };
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

  formatarData() {
    const dataAtual = new Date();
    const dataFormatada = `${dataAtual.getFullYear()}-${(dataAtual.getMonth() + 1).toString().padStart(2, '0')}-${dataAtual.getDate().toString().padStart(2, '0')} ${dataAtual.getHours().toString().padStart(2, '0')}:${dataAtual.getMinutes().toString().padStart(2, '0')}:${dataAtual.getSeconds().toString().padStart(2, '0')}`;
    return dataFormatada;
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
    this.buscarDadosGarcon()
    this.dataService.getItems().subscribe((data: any) => {
      this.items = data.filter((item: any) => item.type === this.type);
    });
    
  }


  buscarDadosGarcon(){
    this.garcon= this.storage.getItem("user_data")

  }

  goToLogin(): void {
    this.router.navigate(['/']);
  }

  enviar() {
    if (this.destinoItems.length === 0) {
      this.errorMessage = 'Não é possível enviar um pedido vazio.';
      return; 
    } else if (this.clientName.trim() === '') {
      this.showErrorMessage = true;
      return; // Retorna imediatamente se o nome do cliente não foi inserido
    } else {
      this.showErrorMessage = false;
      this.isClientNameEntered = true; // Define a variável de controle para true
    }  

    const pedido = {
      userId: this.garcon.id,
      clientName: this.clientName,
      products: this.destinoItems.map(cartItem => ({
        product: cartItem,
        qty: cartItem.quantity,
        dateEntry: this.formatarData()
      })),
      status: "pending",
      dateEntry: this.formatarData()
    }

    console.log(pedido);

    this.orderService.addOrder(pedido).subscribe(
      response => {
        this.errorMessage = '';
        alert('Pedido enviado com sucesso!');
        this.destinoItems = [];
        this.clientName = "";
        const currentTime = this.formatarData();
        this.destinoItems.forEach(item => {
          item.dateCompleted = currentTime;
        });
      },
      error => {
        console.error('Erro ao enviar pedido:', error);
        this.errorMessage = 'Erro ao enviar o pedido. Por favor, tente novamente mais tarde.';
      }
    );
  }
  

  

  

}