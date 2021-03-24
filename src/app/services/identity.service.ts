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
import { KeyService } from './key.service';

@Injectable({
  providedIn: 'root'
})
export class IdentityService extends IonicIdentityVaultUser<DefaultSession> {
  private key = 'encryption-key';

  constructor(public platform: Platform, private browserAuthPlugin: BrowserAuthPlugin, private keyService: KeyService) {
    super(platform, {
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

  async getEncryptionKey(): Promise<string> {
    const vault = await this.getVault();
    let dbKey = await vault.getValue(this.key);

    if (!dbKey) {
      dbKey = await this.keyService.get(); 
      this.set(dbKey);
    }
    return dbKey;
  }

  private async set(value: string): Promise<void> {
    const vault = await this.getVault();
    await vault.storeValue(this.key, value);
  }

  async clear(): Promise<void> {
    const vault = await this.getVault();
    await vault.storeValue(this.key, undefined);
  }
}
