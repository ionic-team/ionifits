import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
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
        if (this.applePayIsSupported()) {
            this.displayApplePay = await this.applePayService.isAvailable();
        } else {
            const googlePayReady = await this.googlePayService.init();
            this.displayGooglePay = await this.googlePayService.isAvailable();
        }

        this.calculateTotals();
    }

    private calculateTotals(): void {
        this.productsInCart.forEach(p => {
            this.subtotal += (p.price * p.quantity);
        });

        this.total = this.subtotal + this.tax;
    }

    // Apple Pay is only supported on Safari web browser or on iOS devices,
    // so detect if the Apple Pay button is available
    private applePayIsSupported(): boolean {
        return CSS.supports("-webkit-appearance", "-apple-pay-button");
    }

    async triggerApplePay() {
        const result = await this.applePayService.makePayment(this.productsInCart, this.total);

        this.modalController.dismiss({
            paymentSuccessful: result
        });
    }

    async triggerGooglePay() {
        const result = await this.googlePayService.makePayment(this.total);

        this.modalController.dismiss({
            paymentSuccessful: result
        });
    }
}
