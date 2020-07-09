import { Component } from '@angular/core';
import { Plugins, StatusBarStyle, Capacitor } from '@capacitor/core';
const { SplashScreen, StatusBar } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor() {
    this.initializeApp();
  }

  initializeApp() {
    if (Capacitor.isNative) {
      StatusBar.setStyle({ style: StatusBarStyle.Light });

      /* To make sure we provide the fastest app loading experience 
          for our users, hide the splash screen automatically 
          when the app is ready to be used:
          
          https://capacitor.ionicframework.com/docs/apis/splash-screen#hiding-the-splash-screen
      */
      SplashScreen.hide();
    }
  }
}
