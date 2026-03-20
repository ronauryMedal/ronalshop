import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductCard } from '../../components/product-card/product-card';
import { ProductsService } from 'src/app/products/services/products.service';
import { Gender } from 'src/app/products/interfaces/product.interface';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard],
  templateUrl: './home-page.html',
  standalone: true,
})
export class HomePage {

 productsService = inject(ProductsService);

 productsResource = rxResource({
  stream: () => {
    return this.productsService.getProducts({});
    }
  });
}
