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
      authMode: AuthMode.SecureStorage,
      restoreSessionOnReady: true,
      unlockOnReady: true,
      unlockOnAccess: true,
      lockAfter: 5000,
      hideScreenOnBackground: true
    });
   }


}
