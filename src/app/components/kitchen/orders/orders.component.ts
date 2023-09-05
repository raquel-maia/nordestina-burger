import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { OrderService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class  OrdersComponent {
  orders: any[] = [];

  
  constructor(
    private readonly orderService: OrderService,
    )
    {}
  ngOnInit() {
    this.orderService.getOrders().subscribe((data) => {
      this.orders = data;
    });
  }

}
