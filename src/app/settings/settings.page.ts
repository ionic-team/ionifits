import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";
import { ImplementationModalPage } from "../implementation-modal/implementation-modal.page";
import { IonRouterOutlet, ModalController } from "@ionic/angular";
import { StatusBar, Style } from "@capacitor/status-bar";
import packageJson from "../../../package.json";
import { StorageService } from "../services/storage.service";
import { Theme, ThemeService } from "../services/theme.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"],
})
export class SettingsPage implements OnInit, OnDestroy {
  public user: any;
  public version: string;

  public theme: string = "system";
  public themes: Theme[] = [];
  private themeSub: Subscription;

  constructor(
    public router: Router,
    public modalController: ModalController,
    public themeService: ThemeService,
    private routerOutlet: IonRouterOutlet,
    private authService: AuthenticationService,
    private storageService: StorageService
  ) {
    this.version = packageJson.version;
    this.themes = this.themeService.themes;
  }

  async ngOnInit() {
    this.user = await this.authService.getUserInfo();
    this.setupSubs();

    // await this.storageService.init();
    // this.storageService.readTheme().then((theme: string | undefined) => {
    //   console.log("storage theme:", theme);
    //   this.theme = theme || "system";
    //   console.log("theme:", this.theme);
    //   console.log("prefersDark:", this.mqlDark.matches);
    //   this.toggleDarkClass();
    // });
  }

  ngOnDestroy(): void {
    this.themeSub.unsubscribe();
  }

  private setupSubs() {
    this.themeSub = this.themeService.getThemeChangeMsg().subscribe((res) => {
      console.log(`theme: ${res}`);
      this.theme = res;

      switch (this.theme) {
        case "dark":
        case "light": {
          this.storageService.replaceTheme(this.theme);
          break;
        }
        default:
          this.storageService.readTheme().then((theme: string | undefined) => {
            if (theme) this.storageService.deleteTheme();
          });
          break;
      }

      this.themeService.toggleDarkClass();
    });
  }

  async logIn() {
    await this.router.navigate(["login"]);
  }

  async signOut() {
    await this.authService.logout();
  }

  public toggleTheme(evt: any) {
    evt.stopPropagation();
    this.theme = evt.detail.value;

    this.themeService.sendThemeChangeMsg(evt.detail.value);
    console.log("theme:", this.theme);
  }

  public async openImplModal() {
    const modal: HTMLIonModalElement = await this.modalController.create({
      component: ImplementationModalPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        description: "App management settings.",
        uiComps: [
          {
            name: "Toggle",
            icon: "toggle-outline",
            tag: "<ion-toggle>",
            description: "Communication settings.",
          },
        ],
        nativeFeatures: [
          {
            name: "Auth Connect",
            icon: "lock-closed-outline",
            runtime: "Capacitor Enterprise",
            description:
              "User Details retrieved from logged-in user profile (Auth0).",
          },
        ],
      },
    });

    modal.onDidDismiss().then((result) => {});

    return await modal.present();
  }
}
