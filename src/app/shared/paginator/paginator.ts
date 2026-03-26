import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-paginator',
  imports: [],
  templateUrl: './paginator.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Paginator {


  currentPage = input<number>(1);
  totalPages = input<number>(0);

  getPagesList = computed(() => {
    return Array.from({ length: this.totalPages() }, (_, index) => index + 1);
  }); 


 }
