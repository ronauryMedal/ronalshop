import { SlicePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Product } from 'src/app/products/interfaces/product.interface';
import { RouterLink } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'product-card',
  imports: [SlicePipe, RouterLink, ],
  templateUrl: './product-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCard {

  product = input.required<Product>();

  image = computed(() => `${environment.imagesUrl}/${this.product().images[0]}`);

 }
