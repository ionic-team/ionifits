import { Component } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { register } from 'swiper/element/bundle';

register();

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    constructor() {
        this.initializeApp();
    }

    initializeApp() {
        if (Capacitor.isNativePlatform()) {

            StatusBar.setStyle({ style: Style.Light });

            /* To make sure we provide the fastest app loading experience 
                for our users, hide the splash screen automatically 
                when the app is ready to be used:
                
                https://capacitorjs.com/docs/apis/splash-screen#hiding-the-splash-screen
            */
            SplashScreen.hide();
        }
    }
}
