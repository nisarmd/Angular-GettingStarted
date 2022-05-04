import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IProductService, ProductService } from './product.service';
import { Product } from './products.model';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [{ provide: 'IProductService', useClass: ProductService }],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Product Detail';
  product: Product | undefined;
  errorMessage: string = '';

  productServiceSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    @Inject('IProductService') private productService: IProductService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.productServiceSubscription.unsubscribe();
  }

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.pageTitle += ` for Id: ${id}`;

    this.productServiceSubscription = (
      this.productService.getProducts() as Observable<Product[]>
    ).subscribe({
      next: (data) =>
        (this.product = data.filter((x: Product) => x.productId == id)[0]),
      error: (message) => {
        this.errorMessage = message;
        console.log(this.errorMessage);
      },
    });
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}
