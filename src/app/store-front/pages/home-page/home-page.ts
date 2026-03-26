import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductCard } from '../../components/product-card/product-card';
import { ProductsService } from 'src/app/products/services/products.service';
import { Gender, Product, ProductsResponse } from 'src/app/products/interfaces/product.interface';
import { catchError, of, tap } from 'rxjs';
import { Paginator } from 'src/app/shared/paginator/paginator';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard, Paginator],
  templateUrl: './home-page.html',
  standalone: true,
})
export class HomePage {

 productsService = inject(ProductsService);

 products = signal<Product[]>([]);


 productsResource = rxResource({
  stream: () => {
    return this.productsService.getProducts({ limit:25})
    .pipe(tap((products: ProductsResponse) => this.products.set(products.products)),
    catchError((error) => {
      console.error(error);
      return of([]);
    })
    );
    }
  });
}
