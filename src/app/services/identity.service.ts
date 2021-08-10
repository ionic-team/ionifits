import { Injectable } from '@angular/core';
import { IdentityVaultConfig, BrowserVault, Device, DeviceSecurityType, Vault, VaultType, VaultMigrator } from '@ionic-enterprise/identity-vault';
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
    
    if (Capacitor.isNativePlatform()) {
      this.vault = new Vault(config);
      await Device.setHideScreenOnBackground(true);
      await this.migrateDataToV5();
    } else {
      this.vault = new BrowserVault(config);
    }
  }

  // Migrate the v4 vault to v5 once
  async migrateDataToV5() {
    if (Capacitor.isNativePlatform() && !localStorage.vaultMigrated) {
      try {
        const migrator = new VaultMigrator({
          // old V4 config
          restoreSessionOnReady: false,
          unlockOnReady: false,
          unlockOnAccess: true,
          lockAfter: 1000,
          hideScreenOnBackground: true
        });

        const oldData = await migrator.exportVault();
        if (!!oldData) {
          // Import data into new vault
          await this.vault.importVault(oldData);
          // Remove all of the old data from the legacy vault
          await migrator.clear();
          localStorage.vaultMigrated = true;
        }
      } catch (err) {
        // Something went wrong...
        console.log("MIGRATOR ERROR: ", err.message);
      }
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
