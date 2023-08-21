import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './components/login/login.module';
import { MenuModule } from './components/menu/menu.module';
import { OrderModule } from './components/order/order.module';

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
  loadChildren: () => import('./components/order/order.module').then(m => OrderModule)
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
