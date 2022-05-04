import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {
  IProductService,
  ProductService,
  ProductServiceFlatFile,
} from './product.service';
import { Product } from './products.model';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./products-list.component.css'],
  providers: [{ provide: 'IProductService', useClass: ProductService }],
})
export class ProductListComponent implements OnInit, OnDestroy {
  constructor(
    @Inject('IProductService') private productService: IProductService
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  // error message emitted from observable
  errorMessage: string = '';

  //
  //
  sub!: Subscription;

  // Products
  products: Product[] = [];

  ngOnInit(): void {
    // Used for any initialization like some backend calls onInit of this component
    console.log('This is onInit lifecycle hook from angular');
    if (this.productService instanceof ProductServiceFlatFile) {
      this.filteredProducts = this.products =
        this.productService.getProducts() as Product[];
    } else {
      this.sub = (
        this.productService.getProducts() as Observable<Product[]>
      ).subscribe({
        next: (products) => (this.filteredProducts = this.products = products),
        error: (err) => (this.errorMessage = err),
      });
    }
  }

  // Page Title | One way Binding
  pageTitle: string = 'Product List';

  // CSS styling for image scaling
  imageWidth: number = 50;
  imageMargin: number = 2;

  // Currency Code
  currencyCode: string = 'INR';

  // Image toggling
  showImage: boolean = false;
  // Event Binding | (click)
  toggleImage = (): void => {
    this.showImage = !this.showImage;
  };

  // Two way binding
  private _listFilter: string = '';

  //filering products
  filteredProducts: any = [];

  getProductsByName = (prodName: string): Product[] =>
    this.products.filter((x: Product) =>
      x.productName.toLocaleLowerCase().includes(prodName.toLocaleLowerCase())
    );

  get listFilter() {
    // console.log('Private variable _listFilter value accessed using getter()');
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    console.log('Private variable _listFilter value assigned using setter()');
    this.filteredProducts = this.getProductsByName(value);
  }

  // display stars selected from child component
  starSelected: string = '';

  onStarsClicked(message: string): void {
    this.starSelected = message;
  }
}
