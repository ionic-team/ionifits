import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.demoapp.ionifits',
  appName: 'Ionifits',
  webDir: 'www/browser',
  plugins: {
    SplashScreen: {
      launchShowDuration: 1000,
      launchAutoHide: false
    }
  }
};

export default config;
