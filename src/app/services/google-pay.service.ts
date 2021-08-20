import { Injectable } from '@angular/core';
import {
  GooglePay,
  GooglePayAllowedAuthMethod,
  GooglePayVersion,
  GooglePayPaymentMethod,
  GooglePayAllowedNetwork,
  GooglePayEnvironment,
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
          GooglePayAllowedAuthMethod.PAN_ONLY,
          GooglePayAllowedAuthMethod.CRYPTOGRAM_3DS
        ],
        allowedCardNetworks: [GooglePayAllowedNetwork.VISA],
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
      environment: GooglePayEnvironment.TEST,
      version: this.googlePayVersion,
    });
    return isReady;
  }

  public async isAvailable(): Promise<boolean> {
    const { canMakePayments } = await GooglePay.canMakePayments({
      allowedPaymentMethods: this.allowedPaymentMethods,
    });
    return canMakePayments;
  }

  public async makePayment(total: number): Promise<boolean> {
    const result = await GooglePay.makePaymentRequest({
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
    return true;

    // NOTE: In a production app, you send result details to your relay server
    // in order to complete payment processing.
    // See https://ionic.io/docs/google-pay
  }
}
