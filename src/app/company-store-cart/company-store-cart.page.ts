import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { PaymentsService, ApplePaySummaryItem } from '../services/payments.service';

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

  constructor(private paymentsService: PaymentsService) { }

  ngOnInit() {
    this.calculateTotals();
  }

  private calculateTotals(): void {
    this.productsInCart.forEach(p => {
      this.subtotal += (p.price * p.quantity);
    });

    this.total = this.subtotal + this.tax;
  }

  async triggerApplePay() {
    const items = this.productsInCart.map(product => {
      let applePayItem: ApplePaySummaryItem = {
        label: product.name,
        amount: product.price.toLocaleString(),
        type: "final"
      };
      return applePayItem;
    });

    const total: ApplePaySummaryItem = {
      amount: this.total.toLocaleString(),
      label: 'Total',
      type: 'final',
    };

    const result = await this.paymentsService.makePayment(items, total);
  }
}
