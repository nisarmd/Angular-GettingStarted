import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { Product } from './products.model';

/* @Injectable({
    providedIn: 'root'
}) */

@Injectable()
export class ProductService implements IProductService {
  private productUrl: string = 'api/products/products.json';

  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<Product[]> {
    console.log('API call for Products');
    return this.httpClient.get<Product[]>(this.productUrl).pipe(
      tap((data: any) => console.log('All:', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  handleError(err: HttpErrorResponse) {
    let errorMessage= '';
    if(err.error instanceof ErrorEvent) {
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}

export class ProductServiceFlatFile implements IProductService {
  getProducts(): Product[] {
    console.log('FlatFile call for Products');
    return [
      {
        productId: 1,
        productName: 'Leaf Rake',
        productCode: 'GDN-0011',
        releaseDate: 'March 19, 2021',
        description: 'Leaf rake with 48-inch wooden handle.',
        price: 19.95,
        starRating: 3.2,
        imageUrl: 'assets/images/leaf_rake.png',
      },
      {
        productId: 2,
        productName: 'Garden Cart',
        productCode: 'GDN-0023',
        releaseDate: 'March 18, 2021',
        description: '15 gallon capacity rolling garden cart',
        price: 32.99,
        starRating: 4.2,
        imageUrl: 'assets/images/garden_cart.png',
      },
    ];
  }
}

export interface IProductService {
  getProducts(): Product[] | Observable<Product[]>;
}
