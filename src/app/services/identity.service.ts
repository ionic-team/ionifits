import { Injectable } from '@angular/core';
import {
  AuthMode,
  IonicIdentityVaultUser,
  IonicNativeAuthPlugin,
  DefaultSession
} from '@ionic-enterprise/identity-vault';
import { Platform } from '@ionic/angular';
import { BrowserAuthPlugin } from './browser-auth.plugin';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class IdentityService extends IonicIdentityVaultUser<DefaultSession> {

  constructor(public platform: Platform, private browserAuthPlugin: BrowserAuthPlugin) {
    super(platform, {
      // authMode: AuthMode.BiometricOnly,
      restoreSessionOnReady: false,
      unlockOnReady: false,
      // Automatically trigger Face Id
      unlockOnAccess: true,
      lockAfter: 1000,
      hideScreenOnBackground: true
    });
   }

   getPlugin(): IonicNativeAuthPlugin {
    if (Capacitor.isNativePlatform()) {
      return super.getPlugin();
    }
    return this.browserAuthPlugin;
  }


}
