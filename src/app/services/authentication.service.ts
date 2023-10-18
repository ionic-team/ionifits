import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IdentityService } from './identity.service';
import { Capacitor } from '@capacitor/core';
import { auth0NativeConfig, auth0WebConfig, environment } from '../../environments/environment';
import { Auth0Provider, AuthConnect, AuthResult, ProviderOptions, TokenType } from '@ionic-enterprise/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private identityService: IdentityService;
  private router: Router;
  private loadingIndicator: HTMLIonLoadingElement;
  private initializing: Promise<void> | undefined;
  private provider = new Auth0Provider();
  private authOptions: ProviderOptions;
  private isNativeApp: boolean;

  constructor(router: Router, identityService: IdentityService) {
      // Determine whether to run on mobile or the web
      this.isNativeApp = Capacitor.isNativePlatform();
      this.authOptions = this.isNativeApp ? auth0NativeConfig : auth0WebConfig;

      this.router = router;
      this.identityService = identityService;
      this.initialize();
    }

    private setup(): Promise<void> {
      return AuthConnect.setup({
        platform: this.isNativeApp ? 'capacitor' : 'web',
        logLevel: environment.production ? 'ERROR' : 'DEBUG',
        ios: {
          // The type of iOS webview to use. 'shared' will use a webview that can share session/cookies
          // on iOS to provide SSO across multiple apps but will cause a prompt for the user which asks them
          // to confirm they want to share site data with the app. 'private' uses a webview which will not
          // prompt the user but will not be able to share session/cookie data either for true SSO across
          // multiple apps.
          webView: 'private',
        },
        web: {
          uiMode: 'popup',
          authFlow: 'implicit',
        },
      });
  }

    private initialize(): Promise<void> {
      if (!this.initializing) {
        this.initializing = new Promise( resolve => {
          this.setup().then(() => resolve());
        });
      }
      return this.initializing;
  }

     async login(loadingIndicator) {
      this.loadingIndicator = loadingIndicator;

      const authResult = await AuthConnect.login(this.provider, this.authOptions);
      await this.saveAuthResult(authResult);

      await this.router.navigate(['tabs/employees']);

      // Implicit login: POPUP flow
      if (this.loadingIndicator) {
        this.loadingIndicator.dismiss();
      }
     }

     public async getAuthResult(): Promise<AuthResult | null> {
      let authResult = await this.identityService.getSession();
      console.log("getauthresult: " + authResult);
      if (authResult && (await AuthConnect.isAccessTokenExpired(authResult))) {
          authResult = await this.refreshAuth(authResult);
      }
      
      return authResult;
  }

     // Called as part of CURRENT implicit login flow only
    //  async callback(url, loadingIndicator) {
    //    loadingIndicator.dismiss();

    //    const hash = url.substring(1); // Puts hash in variable, and removes the # character
    //    const urlParams = new URLSearchParams(hash);
    //    const queryEntries = Object.fromEntries(urlParams.entries());
    //    const authResult = await AuthConnect.handleLoginCallback(queryEntries, this.authOptions);
    //  }

    // Log out of auth provider, then automatically redirect to the app page
    // specified in the `logoutUrl` property
    public async logout(): Promise<void> {
      await this.initialize();
      
      const authResult = await this.getAuthResult();
      if (authResult) {
        await AuthConnect.logout(this.provider, authResult);
        await this.saveAuthResult(null);
        await this.router.navigate(['login']);
    }
  }

    async isAuthenticated() {
      const authResult = await this.getAuthResult();
      const isAccessTokenAvailable = await AuthConnect.isAccessTokenAvailable(authResult);
      const isAccessTokenExpired = await AuthConnect.isAccessTokenExpired(authResult);
      const isRefreshTokenAvailable = await AuthConnect.isRefreshTokenAvailable(authResult);
    
      if (isAccessTokenAvailable && !isAccessTokenExpired) {
        return true;
      }
    
      if (!navigator.onLine) {
        if (isRefreshTokenAvailable) return true;
        return false;
      }
    
      try {
        const refreshedAuthResult = await AuthConnect.refreshSession(this.provider, authResult);
        await this.saveAuthResult(refreshedAuthResult);
        return true;
      } catch (err) {
        // Refresh failed, or no `refresh_token` available
        return false;
      }
    }

    async getUserInfo() {
      await this.initialize();
      const res = await this.getAuthResult();

      if(res) {
        const userData = (await AuthConnect.decodeToken(TokenType.id, res)) as 
          { name: string, email: string, picture: string };
        return userData;
      }
      return undefined;
    }

    public async getAccessToken(): Promise<string | undefined> {
      await this.initialize();
      const res = await this.getAuthResult();
      return res?.accessToken;  
    }

    private async saveAuthResult(authResult: AuthResult | null): Promise<void> {
      if (authResult) {
          await this.identityService.setSession(authResult);
      } else {
          await this.identityService.clear();
      }
  }

  public async refreshAuth(authResult: AuthResult): Promise<AuthResult | null> {
    let newAuthResult: AuthResult | null = null;
    if (await AuthConnect.isRefreshTokenAvailable(authResult)) {
        try {
            newAuthResult = await AuthConnect.refreshSession(this.provider, authResult);
        } catch (err) {
            null;
        }
        this.saveAuthResult(newAuthResult);
    }

    return newAuthResult;
  }
}
