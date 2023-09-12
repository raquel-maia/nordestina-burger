import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderDeliveryRoutingModule } from './order-delivery-routing.module';
import { OrderDeliveryComponent } from './order-delivery.component';


@NgModule({
  declarations: [
    OrderDeliveryComponent
  ],
  imports: [
    CommonModule,
    OrderDeliveryRoutingModule
  ]
})
export class OrderDeliveryModule { }
