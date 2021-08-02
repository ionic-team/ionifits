import { Injectable } from '@angular/core';
import { IdentityVaultConfig, BrowserVault, Device, DeviceSecurityType, Vault, VaultType } from '@ionic-enterprise/identity-vault';
import { Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { KeyService } from './key.service';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  private encryptionKey = 'encryption-key';
  vault: Vault | BrowserVault;

  constructor(public platform: Platform, private keyService: KeyService) {
    this.init();
  }
  
  async init() {
    const config: IdentityVaultConfig = {
      key: 'io.ionic.demoapp.ionifits',
      type: VaultType.DeviceSecurity,
      deviceSecurityType: DeviceSecurityType.Both,
      lockAfterBackgrounded: 1000    
    };

    this.vault = Capacitor.isNativePlatform() 
      ? new Vault(config)
      : new BrowserVault(config);
    
    if (Capacitor.isNativePlatform()) {
      Device.setHideScreenOnBackground(true);
    }
  }

  async getEncryptionKey(): Promise<string> {
    let dbKey = await this.vault.getValue(this.encryptionKey);

    if (!dbKey) {
      dbKey = await this.keyService.get(); 
      this.set(this.encryptionKey, dbKey);
    }
    return dbKey;
  }

  private async set(key: string, value: string): Promise<void> {
    await this.vault.setValue(key, value);
  }

  async unlock() {
    await this.vault.unlock();
  }

  async hasStoredSession() {
    return await this.vault.doesVaultExist();
  }

  async logout() {
    await this.vault.clear();
  }
}
