import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-company-store-cart',
  templateUrl: './company-store-cart.page.html',
  styleUrls: ['./company-store-cart.page.scss'],
})
export class CompanyStoreCartPage implements OnInit {

  @Input() productsInCart: Product[];
  subtotal: number = 0;
  total: number = 0;
  tax: number = 5;

  constructor() { }

  ngOnInit() {
    this.calculateTotals();
  }

  private calculateTotals(): void {
    this.productsInCart.forEach(p => {
      this.subtotal += (p.price * p.quantity);
    });

    this.total = this.subtotal + this.tax;
  }
}
