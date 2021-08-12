import { Injectable } from '@angular/core';
import {
  GooglePay,
  GooglePayAllowedAuthMethods,
  GooglePayVersion,
  GooglePayPaymentMethod,
  GooglePayAllowedNetworks,
} from '@ionic-enterprise/google-pay';

@Injectable({
  providedIn: 'root',
})
export class GooglePayService {
  private googlePayVersion: GooglePayVersion = {
    apiVersion: 2,
    apiVersionMinor: 0,
  };
  private allowedPaymentMethods: GooglePayPaymentMethod[] = [
    {
      type: 'CARD',
      parameters: {
        allowedAuthMethods: [
          GooglePayAllowedAuthMethods.PAN_ONLY,
          GooglePayAllowedAuthMethods.CRYPTOGRAM_3DS,
        ],
        allowedCardNetworks: [GooglePayAllowedNetworks.VISA],
      },
      tokenizationSpecification: {
        type: 'PAYMENT_GATEWAY',
        parameters: {
          gateway: 'example',
          gatewayMerchantId: 'exampleGatewayMerchantId',
        },
      },
    },
  ];

  constructor() {}

  public async init(): Promise<void> {
    const res = await GooglePay.initGooglePayClient({
      environment: 'TEST',
      version: this.googlePayVersion,
    });
    console.log('INIT RES', res);
  }

  public async canMakePayment(): Promise<void> {
    const res = await GooglePay.canMakePayments({
      allowedPaymentMethods: this.allowedPaymentMethods,
    });
    console.log('CAN MAKE PAYMENT', res);
  }

  public async makePaymentRequest(): Promise<void> {
    const res = await GooglePay.makePaymentRequest({
      allowedPaymentMethods: this.allowedPaymentMethods,
      merchantInfo: {
        merchantId: '12345678901234567890',
        merchantName: 'Dallas Test Merchant',
      },
      transactionInfo: {
        countryCode: 'US',
        currencyCode: 'USD',
        totalPrice: '1.00',
        totalPriceStatus: 'FINAL',
      },
    });
    console.log('MAKE PAYMENT REQUEST', res);
  }
}
