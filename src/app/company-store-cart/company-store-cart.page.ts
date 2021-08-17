import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Product } from '../models/product';
import { ApplePayService } from '../services/apple-pay.service';
import { GooglePayService } from '../services/google-pay.service';

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
  displayGooglePay: boolean = false;

  constructor(
    private applePayService: ApplePayService, 
    private googlePayService: GooglePayService,
    private modalController: ModalController
    ) { }

  async ngOnInit() {
     this.displayApplePay = await this.applePayService.isAvailable();
    
    // If not Apple Pay compatible, show Google Pay
    if (!this.displayApplePay) {
      const googlePayReady = await this.googlePayService.init();
      console.log("g pay ready?", googlePayReady);
      this.displayGooglePay = await this.googlePayService.isAvailable();
      console.log("g pay available?", this.displayGooglePay);
    }

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
    
    this.modalController.dismiss({});
  }

  async triggerGooglePay() {
    const result = await this.googlePayService.makePayment(this.total);
    
    this.modalController.dismiss({});
  }
}
