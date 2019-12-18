import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  private user: any;

  constructor(private authService: AuthenticationService, public router: Router) { }

  async ngOnInit() {
    this.user = await this.authService.getUserInfo();
  }
  
  async logIn() {
    await this.router.navigate(['login']);
  }

  async signOut() {
    await this.authService.logout();
  }

}
