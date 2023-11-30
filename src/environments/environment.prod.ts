import { ProviderOptions } from '@ionic-enterprise/auth';

export const environment = {
  production: true
};

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
  redirectUri: 'https://ionifits.ionicframework.com/login',
  // requested scopes from provider
  scope: 'openid offline_access email picture profile',
  // the audience, if applicable
  audience: 'https://api.myapp.com',
  // the URL to redirect to after log out
  logoutUrl: 'https://ionifits.ionicframework.com/login'
};
