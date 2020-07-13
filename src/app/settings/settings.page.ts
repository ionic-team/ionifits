import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ImplementationModalPage } from '../implementation-modal/implementation-modal.page';
import { IonRouterOutlet, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  public user: any;

  constructor(
    private authService: AuthenticationService, 
    public router: Router, 
    private routerOutlet: IonRouterOutlet,
    public modalController: ModalController) { }

  async ngOnInit() {
    this.user = await this.authService.getUserInfo();
  }
  
  async logIn() {
    await this.router.navigate(['login']);
  }

  async signOut() {
    await this.authService.logout();
  }

  async openImplModal() {
    const modal: HTMLIonModalElement = await this.modalController.create({
      component: ImplementationModalPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: { 
        "description": "App management settings.",
        "uiComps": [
          {
            name: "Toggle", icon: "toggle-outline", tag: "<ion-toggle>",
            description: "Communication settings."
          }],
        "nativeFeatures": [
          {
            name: "Auth Connect", icon: "lock-closed-outline", runtime: "Capacitor Enterprise",
            description: "User Details retrieved from logged-in user profile (Auth0)."
          }
        ]
      }
    });
     
    modal.onDidDismiss().then((result) => { });
    
    return await modal.present();
  }

}
