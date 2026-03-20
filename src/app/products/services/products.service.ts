import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ProductsResponse } from '../interfaces/product.interface';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';


interface Options {
  limit?: number;
  gender?: string;
  offset?: number;
}


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly API_URL = environment.apiUrl;



  private http = inject(HttpClient);


  getProducts(options: Options): Observable<ProductsResponse> {

    const {  limit , gender , offset } = options;

    
    const params = new HttpParams()
      .set('limit', limit?.toString() || '10')
      .set('gender', gender || '')
      .set('offset', offset?.toString() || '0');

    return this.http.get<ProductsResponse>(`${this.API_URL}/products`, { params:params}).pipe(tap((products) => console.log(products)));
      }
}
