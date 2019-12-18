import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthenticationService, 
    public loadingController: LoadingController,
    public router: Router) { }

  async ngOnInit() {
    // If coming back after logging into Auth0,
    // and using CURRENT Implicit (web) Login
    if (window.location.hash) {
      const loadingIndicator = await this.showLoadingIndictator();

      // Pass it to Auth Connect
      await this.authService.callback(window.location.href, loadingIndicator);
    }
   }

  async login() {
    // Display loading indicator while Auth Connect login window is open
    const loadingIndicator = await this.showLoadingIndictator();

    await this.authService.login(loadingIndicator);
  }

  async showLoadingIndictator() {
    const loadingIndicator = await this.loadingController.create({
       message: 'Opening login window...' 
     });
    await loadingIndicator.present();
    
    return loadingIndicator;
  }

  async skipLogin() {
    await this.router.navigate(['tabs/employees']);
  }
}