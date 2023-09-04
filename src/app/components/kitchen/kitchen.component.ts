import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';


@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})

export class KitchenComponent {
  
  constructor(
    private dataService: ProductsService,
    private router: Router
  ) {}


  goToLogin(): void {
    this.router.navigate(['/']);
  }

}
