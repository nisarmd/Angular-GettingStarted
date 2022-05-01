import { Component, OnInit } from '@angular/core';
import { Product } from './products.model';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductListComponent implements OnInit {
  ngOnInit(): void {
    // Used for any initialization like some backend calls onInit of this component
    console.log('This is onInit lifecycle hook from angular');
    this.listFilter = 'cart';
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
  filteredProducts: Product[] = [];

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

  // Products
  products: Product[] = [
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

  onStarsClicked(message: string): void {
    this.starSelected = message;
  }
}
