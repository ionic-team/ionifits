import { Injectable } from '@angular/core';
import { IonicAuth, IonicAuthOptions } from '@ionic-enterprise/auth';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

const auth0CordovaConfig : IonicAuthOptions = {
  // the auth provider
  authConfig: 'auth0',
  // The platform which we are running on
  platform: 'cordova',
  // client or application id for provider
  clientID: 'jnvtyhFq52alCReRnhCQp5PAszYoUzj0',
  // the discovery url for the provider
  // OpenID configuration
  discoveryUrl: 'https://ionicorg.auth0.com/.well-known/openid-configuration',
  // the URI to redirect to after log in
  redirectUri: 'acAuth0://login',
  // requested scopes from provider
  scope: 'openid offline_access email picture profile',
  // the audience, if applicable
  audience: 'https://api.myapp.com',
  // the URL to redirect to after log out
  logoutUrl: 'acAuth0://login',
  // The type of iOS webview to use. 'shared' will use a webview that can share session/cookies
  // on iOS to provide SSO across multiple apps but will cause a prompt for the user which asks them
  // to confirm they want to share site data with the app. 'private' uses a webview which will not
  // prompt the user but will not be able to share session/cookie data either for true SSO across
  // multiple apps.
  iosWebView: 'private'
};

const auth0WebConfig : IonicAuthOptions = {
  // the auth provider
  authConfig: 'auth0',
  // The platform which we are running on
  platform: 'web',
  // client or application id for provider
  clientID: 'jnvtyhFq52alCReRnhCQp5PAszYoUzj0',
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
  logoutUrl: 'http://localhost:8100/login',
  // The type of iOS webview to use. 'shared' will use a webview that can share session/cookies
  // on iOS to provide SSO across multiple apps but will cause a prompt for the user which asks them
  // to confirm they want to share site data with the app. 'private' uses a webview which will not
  // prompt the user but will not be able to share session/cookie data either for true SSO across
  // multiple apps.
  iosWebView: 'private',
  implicitLogin: 'CURRENT'
};


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends IonicAuth {

  private router: Router;
  private loadingIndicator: HTMLIonLoadingElement;

  constructor(router: Router, platform: Platform) {
      // Determine whether to run on mobile or the web
      const selectedConfig = platform.is("hybrid") ? auth0CordovaConfig : auth0WebConfig;
      super(selectedConfig);

      this.router = router;
    }

     async login(loadingIndicator) {
       this.loadingIndicator = loadingIndicator;

       await super.login();
     }

     // Event fired by Auth Connect upon successful login to auth provider.
    async onLoginSuccess(response: any) {
      await this.router.navigate(['tabs/employees']);

      // Implicit login: POPUP flow
      if (this.loadingIndicator) {
        this.loadingIndicator.dismiss();
      }
    }

     // Called as part of CURRENT implicit login flow only
     async callback(url, loadingIndicator) {
       loadingIndicator.dismiss();

       await super.handleCallback(url);
     }

    // Log out of auth provider, then automatically redirect to the app page
    // specified in the `logoutUrl` property
    async logout() {
      await super.logout();
    }

    async onLogout() {
      await this.router.navigate(['login']);
    }

    async isAuthenticated() {
      return await super.isAuthenticated();
    }

    async getUserInfo() {
      return await super.getIdToken();
    }
}
