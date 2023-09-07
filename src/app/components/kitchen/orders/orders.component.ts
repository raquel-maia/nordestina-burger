import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  orders: any[] = [];
  clientName: string = '';
  order = {
    status: 'pending',
    currentStatus: 'Pendente'
  };

  constructor(
    private readonly orderService: OrderService,
    private readonly router: Router,
  ) {}

  ngOnInit() {
    this.listOrders(); 
  }

  private listOrders() {
    this.orderService.getOrders().subscribe(data => {
      data = data.filter(pedido => pedido.status === 'pending');
      data.map(pedido => pedido.currentStatus = pedido.status);
      console.log(data);
      this.orders = data;
      this.clientName = '';
      console.log(this.orders);
    });
  }

  finishOrder(order: any) {
    order.status = 'concluido';
    this.orderService.editOrder(order).subscribe(data => {
      this.orders = [];
      this.listOrders();
    });
  }

  goToLogin(): void {
    this.router.navigate(['/']);
  }
}
