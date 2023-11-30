import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { IdentityService } from '../services/identity.service';
import { ModalController, IonRouterOutlet } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ImplementationModalPage } from '../implementation-modal/implementation-modal.page';
import { addIcons } from "ionicons";
import { informationCircleOutline } from "ionicons/icons";

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage {

    constructor(private authService: AuthenticationService,
        private identityService: IdentityService,
        public router: Router,
        public modalController: ModalController,
        private routerOutlet: IonRouterOutlet) {
        addIcons({ informationCircleOutline });
    }

    async ionViewWillEnter() {
        // Check if user has previously signed into Auth Connect
        const hasSession = await this.identityService.hasStoredSession();
        console.log("user has stored session: " + hasSession);

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
        await this.authService.login();
    }

    async skipLogin() {
        await this.router.navigate(['tabs/employees']);
    }

    async openImplModal() {
        const modal: HTMLIonModalElement = await this.modalController.create({
            component: ImplementationModalPage,
            presentingElement: this.routerOutlet.nativeEl,
            componentProps: {
                "description": "Log in with username: user@test.com and password: ionic",
                "uiComps": [
                    {
                        name: "Card", icon: "easel-outline", tag: "<ion-card>",
                        description: "The login form."
                    }],
                "nativeFeatures": [
                    {
                        name: "Auth Connect", icon: "lock-closed-outline", runtime: "Ionic Enterprise",
                        description: "Seamless single sign-on. Currently, the auth provider is Auth0."
                    }, {
                        name: "Identity Vault", icon: "key-outline", runtime: "Ionic Enterprise",
                        description: "All-in-one biometric authentication. After login, the Auth0 user access token is securely stored in the mobile device keychain using Ionic Identity Vault. When the app is placed into the background, the screen is obscured to protect Ionifits data."
                    }
                ]
            }
        });

        modal.onDidDismiss().then((result) => { });

        return await modal.present();
    }
}
