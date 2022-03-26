import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../services/authentication.service";
import { IdentityService } from "../services/identity.service";
import {
  LoadingController,
  ModalController,
  IonRouterOutlet,
} from "@ionic/angular";
import { Router } from "@angular/router";
import {
  NativeFeature,
  UIComponent,
} from "src/app/implementation-modal/implementation-modal.page";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  private _implPage: any;

  constructor(
    private authService: AuthenticationService,
    private identityService: IdentityService,
    public loadingController: LoadingController,
    public router: Router,
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet
  ) {}

  async ngOnInit() {
    // If coming back after logging into Auth0,
    // and using CURRENT Implicit (web) Login
    if (window.location.hash) {
      const loadingIndicator = await this.showLoadingIndictator();

      // Pass it to Auth Connect
      await this.authService.callback(window.location.href, loadingIndicator);
    }
  }

  async ionViewWillEnter() {
    // Check if user has previously signed into Auth Connect
    const hasSession = await this.identityService.hasStoredSession();

    if (hasSession) {
      // if yes, then attempt FaceId unlock
      await this.identityService.unlock();
      if (await this.authService.isAuthenticated()) {
        // if it unlocks, enter app
        await this.skipLogin();
      }
    }
  }

  async login() {
    // Display loading indicator while Auth Connect login window is open
    const loadingIndicator = await this.showLoadingIndictator();

    await this.authService.login(loadingIndicator);
  }

  async showLoadingIndictator() {
    const loadingIndicator = await this.loadingController.create({
      message: "Opening login window...",
    });
    await loadingIndicator.present();

    return loadingIndicator;
  }

  async skipLogin() {
    await this.router.navigate(["tabs/employees"]);
  }

  async openImplModal() {
    if (!this._implPage) {
      const { ImplementationModalPage } = await import(
        "src/app/implementation-modal/implementation-modal.page"
      );
      this._implPage = ImplementationModalPage;
    }

    let uiComps: UIComponent[] = [
      {
        name: "Card",
        icon: "easel-outline",
        tag: "<ion-card>",
        description: "The login form.",
      },
    ];

    let nativeFeatures: NativeFeature[] = [
      {
        name: "Auth Connect",
        icon: "lock-closed-outline",
        runtime: "Ionic Enterprise",
        description:
          "Seamless single sign-on. Currently, the auth provider is Auth0.",
      },
      {
        name: "Identity Vault",
        icon: "key-outline",
        runtime: "Ionic Enterprise",
        description:
          "All-in-one biometric authentication. After login, the Auth0 user access token is securely stored in the mobile device keychain using Ionic Identity Vault. When the app is placed into the background, the screen is obscured to protect Ionifits data.",
      },
    ];

    const modal: HTMLIonModalElement = await this.modalController.create({
      component: this._implPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        description: "Log in with username: user@test.com and password: ionic",
        uiComps: uiComps,
        nativeFeatures: nativeFeatures,
      },
    });

    return await modal.present();
  }
}
