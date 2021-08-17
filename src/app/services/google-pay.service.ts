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

  public async init(): Promise<boolean> {
    const { isReady } = await GooglePay.initGooglePayClient({
      environment: 'TEST',
      version: this.googlePayVersion,
    });
    console.log('INIT RES', isReady);
    return isReady;
  }

  public async isAvailable(): Promise<boolean> {
    const { canMakePayments } = await GooglePay.canMakePayments({
      allowedPaymentMethods: this.allowedPaymentMethods,
    });
    return canMakePayments;
  }

  public async makePayment(total: number): Promise<boolean> {
    const res = await GooglePay.makePaymentRequest({
      allowedPaymentMethods: this.allowedPaymentMethods,
      merchantInfo: {
        merchantId: '12345678901234567890',
        merchantName: 'Ionifits Test Merchant',
      },
      transactionInfo: {
        countryCode: 'US',
        currencyCode: 'USD',
        totalPrice: total.toLocaleString(),
        totalPriceStatus: 'FINAL',
      },
    });
    console.log('MAKE PAYMENT REQUEST', res);
    return true;

    // real app: implement steps 6 to 9 yourself on a server.
    // todo: tell user transaction was successful
  }
}
