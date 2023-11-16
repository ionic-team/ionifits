import { Injectable } from '@angular/core';
import { IdentityVaultConfig, BrowserVault, Device, DeviceSecurityType, Vault, VaultType, VaultMigrator } from '@ionic-enterprise/identity-vault';
import { Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { KeyService } from './key.service';
import { AuthResult } from '@ionic-enterprise/auth';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  private encryptionKey = 'encryption-key';
  private authConnectKey = 'auth-connect';
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
    
    if (Capacitor.isNativePlatform()) {
      this.vault = new Vault(config);
      await Device.setHideScreenOnBackground(true);
    } else {
      this.vault = new BrowserVault(config);
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

  public clear(): Promise<void> {
    return this.vault.clear();
  }

  public async getSession(): Promise<AuthResult | null> {
    const data = await this.vault.getValue(this.authConnectKey);
    if (!data) return null;
    return JSON.parse(data);
  }

  public setSession(value: AuthResult): Promise<void> {
    return this.vault.setValue(this.authConnectKey, JSON.stringify(value));
  }

  async unlock() {
    await this.vault.unlock();
  }

  async hasStoredSession() {
    // todo: why does this return empty true when data is there in session storage?
    return await !this.vault.isEmpty();
  }

  async logout() {
    await this.vault.clear();
  }

  async toggleHideScreen(shouldHide: boolean) {
    await Device.setHideScreenOnBackground(shouldHide);
  }
}
