import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.demoapp.ionifits',
  appName: 'Ionifits',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 1000,
      launchAutoHide: false
    },
    LiveUpdates: {
      appId: '34df4710',
      channel: 'new-lu-sdk',
      autoUpdateMethod: 'background',
      maxVersions: 2,
    }
  }
};

export default config;
