import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ApplePayService } from '../services/apple-pay.service';

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
  displayApplePay: boolean = false;
  displayGooglePay: boolean = true;

  constructor(private applePayService: ApplePayService) { }

  async ngOnInit() {
    this.displayApplePay = await this.applePayService.isAvailable();
    this.displayGooglePay = true;

    this.calculateTotals();
  }

  private calculateTotals(): void {
    this.productsInCart.forEach(p => {
      this.subtotal += (p.price * p.quantity);
    });

    this.total = this.subtotal + this.tax;
  }

  async triggerApplePay() {
    const result = await this.applePayService.makePayment(this.productsInCart, this.total);
  }
}
