import {  Component, inject, signal } from '@angular/core';
import { ProductCard } from '../../components/product-card/product-card';
import { ProductsService } from 'src/app/products/services/products.service';
import { rxResource } from '@rxjs-toolkit/resource';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard],
  templateUrl: './home-page.html',
  standalone: true,
})
export class HomePage {

 productsService = inject(ProductsService);

 productsresousce = rxResource({
  request: () => ({}),
  loader: ({request}: {request: Request}) => {
    return this.productsService.getProducts();
    }
  });
}
