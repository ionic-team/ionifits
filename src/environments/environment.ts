// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { ProviderOptions } from '@ionic-enterprise/auth';

export const environment = {
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

export const auth0NativeConfig: ProviderOptions = {
  // client or application id for provider
  clientId: 'ihSRqLLa2z33PTyeNNlI2uxgsqorb08l',
  // the discovery url for the provider
  // OpenID configuration
  discoveryUrl: 'https://ionicorg.auth0.com/.well-known/openid-configuration',
  // the URI to redirect to after log in
  redirectUri: 'ionifits://login',
  // requested scopes from provider
  scope: 'openid offline_access email picture profile',
  // the audience, if applicable
  audience: 'https://api.myapp.com',
  // the URL to redirect to after log out
  logoutUrl: 'ionifits://login'
};

export const auth0WebConfig: ProviderOptions = {
  // client or application id for provider
  clientId: 'ihSRqLLa2z33PTyeNNlI2uxgsqorb08l',
  // the discovery url for the provider
  // OpenID configuration
  discoveryUrl: 'https://ionicorg.auth0.com/.well-known/openid-configuration',
  // the URI to redirect to after log in
  redirectUri: 'http://localhost:8100/login',
  // requested scopes from provider
  scope: 'openid offline_access email picture profile',
  // the audience, if applicable
  audience: 'https://api.myapp.com',
  // the URL to redirect to after log out
  logoutUrl: 'http://localhost:8100/login'
};

