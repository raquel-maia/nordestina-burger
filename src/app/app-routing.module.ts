import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './components/login/login.module';
import { MenuModule } from './components/menu/menu.module';
import { OrderModule } from './components/kitchen/order/order.module';
import { KitchenModule } from './components/kitchen/kitchen.module';
import { OrdersModule } from './components/kitchen/orders/orders.module';
import { OrderDeliveryModule } from './components/kitchen/order-delivery/order-delivery.module';

const routes: Routes = [{
  path:'',
  loadChildren: () => import('./components/login/login.module').then(m => LoginModule)
},
{
  path:'cardapio',
  loadChildren: () => import('./components/menu/menu.module').then(m => MenuModule)
},
{
  path:'order',
  loadChildren: () => import('./components/kitchen/order/order.module').then(m=> OrderModule)
},
{
  path:'kitchen',
  loadChildren: () => import('./components/kitchen/kitchen.module').then(m => KitchenModule)
},
{
  path:'cooking',
  loadChildren: () => import('./components/kitchen/orders/orders.module').then(m => OrdersModule)
},
{
  path:'finalizado',
  loadChildren: () => import('./components/kitchen/order-delivery/order-delivery.module').then(m => OrderDeliveryModule)
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
