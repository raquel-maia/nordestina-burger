import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDeliveryComponent } from './order-delivery.component';

const routes: Routes = [{
  path:'',
  component:OrderDeliveryComponent


}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderDeliveryRoutingModule { }
