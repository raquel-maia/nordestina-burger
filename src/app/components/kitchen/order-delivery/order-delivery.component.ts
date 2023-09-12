import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/orders/orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-delivery',
  templateUrl: './order-delivery.component.html',
  styleUrls: ['./order-delivery.component.css']
})
export class OrderDeliveryComponent {
  OrderDelivery: any[] = [];
  clientName: string = '';
  order = {
    status: 'pending',
    currentStatus: 'Pendente'
  };
  lastCompletedOrder: any = null; // Armazenar o último pedido concluído

  constructor(
    private readonly orderService: OrderService,
    private readonly router: Router,
  ) {}

  ngOnInit() {
    this.listOrders(); 
  }

  private listOrders() {
    this.orderService.getOrders().subscribe(data => {
      // Filtrar apenas os pedidos concluídos
      const completedOrders = data.filter(pedido => pedido.status === 'concluido');
      
      // Encontrar o último pedido concluído
      if (completedOrders.length > 0) {
        this.lastCompletedOrder = completedOrders[completedOrders.length - 1];
      } else {
        this.lastCompletedOrder = null; // Nenhum pedido concluído encontrado
      }

      console.log(this.lastCompletedOrder);

      // Atualizar a lista de pedidos de entrega apenas com o último pedido concluído
      this.OrderDelivery = this.lastCompletedOrder ? [this.lastCompletedOrder] : [];
      
      this.clientName = '';
      console.log(this.OrderDelivery);
    });
  }

  finishOrder(order: any) {
    order.status = '';
    this.orderService.editOrder(order).subscribe(data => {
      this.lastCompletedOrder = null; // O último pedido concluído será recarregado na próxima chamada
      this.OrderDelivery = [];
      this.listOrders();
    });
  }

  goToLogin(): void {
    this.router.navigate(['/']);
  }
}
