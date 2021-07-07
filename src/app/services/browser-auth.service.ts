import { Injectable } from '@angular/core';
import { BiometricType, IdentityVault, PluginConfiguration, AuthMode } from '@ionic-enterprise/identity-vault';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
// Identity Vault web implementation
export class BrowserAuthService implements IdentityVault {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.storage.create().then((value) => {
      this._storage = value;
    });
  }
  setHideScreenOnBackground(enabled: boolean): Promise<void> {
    throw new Error('Method not implemented.');
  }

  isLockedOutOfBiometrics(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  getAvailableHardware(): Promise<import("@ionic-enterprise/identity-vault").SupportedBiometricType[]> {
    throw new Error("Method not implemented.");
  }

  config = {
    authMode: AuthMode.SecureStorage,
    descriptor: {
      username: '',
      vaultId: ''
    },
    isBiometricsEnabled: false,
    isPasscodeEnabled: false,
    isPasscodeSetupNeeded: false,
    isSecureStorageModeEnabled: true,
    hideScreenOnBackground: false,
    lockAfter: 50000
  };

  unsubscribe(): Promise<void> {
    return Promise.resolve();
  }

  clear(): Promise<void> {
    return this._storage.clear();
  }

  lock(): Promise<void> {
    return Promise.resolve();
  }

  isLocked(): Promise<boolean> {
    return Promise.resolve(false);
  }

  async isInUse(): Promise<boolean> {
    return true;
  }

  getConfig(): Promise<PluginConfiguration> {
    return Promise.resolve(this.config);
  }

  remainingAttempts(): Promise<number> {
    return Promise.resolve(5);
  }

  getUsername(): Promise<string> {
    return Promise.resolve('MyUsername');
  }

  storeToken(token: any): Promise<void> {
    return Promise.resolve();
  }

  getToken(): Promise<any> {
    return Promise.resolve('MyToken');
  }

  async storeValue(key: string, value: any): Promise<void> {
    await this._storage.set(key, JSON.stringify(value));
  }

  async getValue(key: string): Promise<any> {
    const value = await this._storage.get(key);
    return JSON.parse(value);
  }

  getBiometricType(): Promise<BiometricType> {
    const none: BiometricType = 'none';
    return Promise.resolve(none);
  }

  setBiometricsEnabled(isBiometricsEnabled: boolean): Promise<void> {
    return Promise.resolve();
  }

  isBiometricsEnabled(): Promise<boolean> {
    return Promise.resolve(false);
  }

  isBiometricsAvailable(): Promise<boolean> {
    return Promise.resolve(false);
  }

  isBiometricsSupported(): Promise<boolean> {
    return Promise.resolve(false);
  }

  isPasscodeSetupNeeded(): Promise<boolean> {
    return Promise.resolve(false);
  }

  setPasscode(passcode?: string): Promise<void> {
    return Promise.resolve();
  }

  isPasscodeEnabled(): Promise<boolean> {
    return Promise.resolve(false);
  }

  isSecureStorageModeEnabled(): Promise<boolean> {
    return Promise.resolve(true);
  }

  setPasscodeEnabled(isPasscodeEnabled: boolean): Promise<void> {
    return Promise.resolve();
  }

  setSecureStorageModeEnabled(enabled: boolean): Promise<void> {
    return Promise.resolve();
  }

  unlock(usingPasscode?: boolean, passcode?: string): Promise<void> {
    return Promise.resolve();
  }

  removeValue(key: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getKeys(): Promise<string[]> {
    throw new Error("Method not implemented.");
  }
}
