import { Injectable } from '@angular/core';
import {
  ApplePay,
  ApplePayMerchantCapabilities,
  ApplePaySummaryItem,
  ApplePaySupportedNetworks
} from '@ionic-enterprise/apple-pay';
import { IdentityService } from './identity.service';
export { ApplePaySummaryItem } from '@ionic-enterprise/apple-pay';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
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
    'https://applepayrelay.dallastjames.com/applepayrelay/session/start';
  private authorizationUrl =
    'https://applepayrelay.dallastjames.com/applepayrelay/session/authorize';

  constructor(private identityService: IdentityService) { }

  async isAvailable(): Promise<boolean> {
    const { canMakePayments } = await ApplePay.canMakePayments({
      merchantIdentifier: this.merchantIdentifier,
      supportedNetworks: this.supportedNetworks,
    });
    return canMakePayments;
  }

  async makePayment(
    items: ApplePaySummaryItem[],
    total: ApplePaySummaryItem,
  ): Promise<boolean> {

    await this.identityService.toggleHideScreen(false);

    const { success } = await ApplePay.makePaymentRequest({
      version: 5,
      merchantValidation: {
        url: this.merchantValidationUrl,
        params: {
          merchantIdentifier: this.merchantIdentifier,
          displayName: 'Dallas James Test Store',
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
        lineItems: items,
        total,
      },
    });

    await this.identityService.toggleHideScreen(true);

    return success;
  }
}
