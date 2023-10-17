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
      maxVersions: 3,
      /* Disable Live Updates since this is a public reference app. 
        Otherwise a live update override could cause confusion for developers.  */
      enabled: false
    }
  }
};

export default config;
