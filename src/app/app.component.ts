import { Component } from "@angular/core";
import { Capacitor } from "@capacitor/core";
import { StatusBar, Style } from "@capacitor/status-bar";
import { SplashScreen } from "@capacitor/splash-screen";
import { Platform } from "@ionic/angular";
import { Subscription } from "rxjs";
import { ThemeService } from "./services/theme.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
})
export class AppComponent {
  private platforms: string[];
  private themeSub: Subscription;

  constructor(private platform: Platform, private themeService: ThemeService) {
    this.platforms = this.platform.platforms();
    this.initializeApp();
  }

  initializeApp() {
    console.log(Capacitor.getPlatform());

    if (Capacitor.isNativePlatform()) {
      try {
        console.log("here");
        this.mqlDark.addEventListener("change", (evt) => {
          console.log("dark: addEventListener", evt.matches);
          // this.toggleDarkTheme(evt.matches);
          StatusBar.setStyle({ style: evt.matches ? Style.Dark : Style.Light });
          // StatusBar.setBackgroundColor({
          //   color: evt.matches ? "#000000" : "#ffffff",
          // });
        });
      } catch (mqlError) {
        console.log(mqlError);
        this.mqlDark.addListener((evt) => {
          console.log("dark: addListener", evt.matches);
          // this.toggleDarkTheme(evt.matches);
          StatusBar.setStyle({ style: evt.matches ? Style.Dark : Style.Light });
          // StatusBar.setBackgroundColor({
          //   color: evt.matches ? "#000000" : "#ffffff",
          // });
        });
      }

      /* To make sure we provide the fastest app loading experience 
          for our users, hide the splash screen automatically 
          when the app is ready to be used:
          
          https://capacitorjs.com/docs/apis/splash-screen#hiding-the-splash-screen
      */
      SplashScreen.hide();
    } else if (this.isStandalone) {
    }

    this.themeSub = this.themeService.getThemeChangeMsg().subscribe(() => {
      this.themeService.toggleDarkClass();
    });
  }

  private get mqlDark(): MediaQueryList {
    return window.matchMedia("(prefers-color-scheme: dark)");
  }

  // Add or remove the "dark" class based on if the media query matches
  toggleDarkTheme(shouldAdd) {
    document.body.classList.toggle("dark", shouldAdd);
  }

  public getPlatforms(): string[] {
    return this.platforms;
  }

  public get isStandalone(): boolean {
    return this.getPlatforms().includes("pwa");
  }
}
