import { Injectable } from '@angular/core';
import {
  ApplePay,
  ApplePayMerchantCapabilities,
  ApplePaySummaryItem,
  ApplePaySupportedNetworks
} from '@ionic-enterprise/apple-pay';
import { Product } from '../models/product';
import { IdentityService } from './identity.service';
export { ApplePaySummaryItem } from '@ionic-enterprise/apple-pay';

@Injectable({
  providedIn: 'root',
})
export class ApplePayService {
  private merchantIdentifier = 'merchant.io.ionic.ionifits.applepay';
  private supportedNetworks: ApplePaySupportedNetworks[] = [
    ApplePaySupportedNetworks.VISA,
    ApplePaySupportedNetworks.MASTERCARD,
    ApplePaySupportedNetworks.AMEX,
    ApplePaySupportedNetworks.DISCOVER,
  ];
  private merchantCapabilties: ApplePayMerchantCapabilities[] = [
    ApplePayMerchantCapabilities.DEBIT,
    ApplePayMerchantCapabilities.CREDIT,
    ApplePayMerchantCapabilities.THREEDS,
  ];
  private countryCode = 'US';
  private currencyCode = 'USD';
  private merchantValidationUrl =
    "https://ionifits-g2rcfstu5-ionic1.vercel.app/api/session/start";
  private authorizationUrl =
    "https://ionifits-g2rcfstu5-ionic1.vercel.app/api/session/authorize";

  constructor(private identityService: IdentityService) { }

  async isAvailable(): Promise<boolean> {
    const { canMakePayments } = await ApplePay.canMakePayments({
      merchantIdentifier: this.merchantIdentifier,
      supportedNetworks: this.supportedNetworks,
    });
    return canMakePayments;
  }

  async makePayment(products: Product[], total: number): Promise<boolean> {
    // Hide splash screen so it doesn't display when Apple Pay prompt appears
    await this.identityService.toggleHideScreen(false);

    // Convert product items into Apple Pay items
    const apItems = products.map(product => {
      let applePayItem: ApplePaySummaryItem = {
        label: product.name,
        amount: product.price.toLocaleString(),
        type: "final"
      };
      return applePayItem;
    });

    const apTotal: ApplePaySummaryItem = {
      amount: total.toLocaleString(),
      label: 'Total',
      type: 'final',
    };

    const { success } = await ApplePay.makePaymentRequest({
      version: 5,
      merchantValidation: {
        url: this.merchantValidationUrl,
        params: {
          merchantIdentifier: this.merchantIdentifier,
          displayName: 'Ionifits Test Store',
          initiative: 'web',
          initiativeContext: 'applepay.dallastjames.com',
        },
      },
      paymentAuthorization: {
        url: this.authorizationUrl,
      },
      request: {
        countryCode: this.countryCode,
        currencyCode: this.currencyCode,
        merchantCapabilities: this.merchantCapabilties,
        supportedNetworks: this.supportedNetworks,
        lineItems: apItems,
        total: apTotal,
      },
    });

    // Turn hide screen back on
    await this.identityService.toggleHideScreen(true);

    return success;
  }
}
