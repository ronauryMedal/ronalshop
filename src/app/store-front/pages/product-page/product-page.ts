import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Gender, Product } from 'src/app/products/interfaces/product.interface';
import { ProductsService } from 'src/app/products/services/products.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-page',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-page.html',
  standalone: true,
})
export class ProductPage { 
  productsService = inject(ProductsService);
  activatedRoute = inject(ActivatedRoute);

  product = signal<Product | null>(null);

  imageUrls = computed(() =>
    (this.product()?.images ?? []).map((file) => `${environment.imagesUrl}/${file}`),
  );

  genderLabel(gender: Gender): string {
    const labels: Record<Gender, string> = {
      [Gender.MEN]: 'Hombre',
      [Gender.WOMEN]: 'Mujer',
      [Gender.KID]: 'Niño/a',
      [Gender.UNISEX]: 'Unisex',
    };
    return labels[gender] ?? gender;
  }

  productIDSlung: string = this.activatedRoute.snapshot.params['idSlug'];


  productResource = rxResource({
    stream: () => this.productsService.getProduct(this.productIDSlung).pipe(tap((product) => this.product.set(product)),
    catchError((error) => {
      console.error(error);
      return of(null);
    })
    ),
  });

}