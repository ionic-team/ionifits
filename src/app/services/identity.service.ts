import { Injectable } from '@angular/core';
import {
  AuthMode,
  IonicIdentityVaultUser,
  DefaultSession
} from '@ionic-enterprise/identity-vault';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class IdentityService extends IonicIdentityVaultUser<DefaultSession> {

  constructor(public platform: Platform) {
    super(platform, {
      authMode: AuthMode.BiometricOnly,
      restoreSessionOnReady: false,
      unlockOnReady: false,
      // Automatically trigger Face Id
      unlockOnAccess: true,
      lockAfter: 1000,
      hideScreenOnBackground: true
    });
   }


}
