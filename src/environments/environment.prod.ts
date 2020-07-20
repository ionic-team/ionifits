import { IonicAuthOptions } from '@ionic-enterprise/auth';

export const environment = {
  production: true
};

export const auth0NativeConfig: IonicAuthOptions = {
  // the auth provider
  authConfig: 'auth0',
  // The platform which we are running on
  platform: 'capacitor',
  // client or application id for provider
  clientID: 'ihSRqLLa2z33PTyeNNlI2uxgsqorb08l',
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
  logoutUrl: 'ionifits://login',
  // The type of iOS webview to use. 'shared' will use a webview that can share session/cookies
  // on iOS to provide SSO across multiple apps but will cause a prompt for the user which asks them
  // to confirm they want to share site data with the app. 'private' uses a webview which will not
  // prompt the user but will not be able to share session/cookie data either for true SSO across
  // multiple apps.
  iosWebView: 'private'
};

export const auth0WebConfig: IonicAuthOptions = {
  // the auth provider
  authConfig: 'auth0',
  // The platform which we are running on
  platform: 'web',
  // client or application id for provider
  clientID: 'ihSRqLLa2z33PTyeNNlI2uxgsqorb08l',
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
  logoutUrl: 'https://ionifits.ionicframework.com/login',
  // The type of iOS webview to use. 'shared' will use a webview that can share session/cookies
  // on iOS to provide SSO across multiple apps but will cause a prompt for the user which asks them
  // to confirm they want to share site data with the app. 'private' uses a webview which will not
  // prompt the user but will not be able to share session/cookie data either for true SSO across
  // multiple apps.
  iosWebView: 'private',
  implicitLogin: 'CURRENT'
};
