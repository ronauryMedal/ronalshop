import { CurrencyPipe } from '@angular/common';
import { Component, computed, effect, ElementRef, inject, signal, viewChild } from '@angular/core';
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
  private static readonly CAROUSEL_INTERVAL_MS = 4_500;

  productsService = inject(ProductsService);
  activatedRoute = inject(ActivatedRoute);

  product = signal<Product | null>(null);

  private carouselEl = viewChild<ElementRef<HTMLDivElement>>('productCarousel');

  imageUrls = computed(() =>
    (this.product()?.images ?? []).map((file) => `${environment.imagesUrl}/${file}`),
  );

  constructor() {
    effect((onCleanup) => {
      const count = this.imageUrls().length;
      if (count < 2 || !this.product()) return;

      let intervalId: ReturnType<typeof setInterval> | undefined;
      const timeoutId = window.setTimeout(() => {
        const el = this.carouselEl()?.nativeElement;
        if (!el) return;

        intervalId = window.setInterval(() => {
          const step = el.clientWidth;
          const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
          if (step <= 0) return;

          const atEnd = el.scrollLeft + step >= maxScroll - 2;
          el.scrollTo({
            left: atEnd ? 0 : el.scrollLeft + step,
            behavior: 'smooth',
          });
        }, ProductPage.CAROUSEL_INTERVAL_MS);
      }, 0);

      onCleanup(() => {
        clearTimeout(timeoutId);
        if (intervalId !== undefined) {
          clearInterval(intervalId);
        }
      });
    });
  }

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