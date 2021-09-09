import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyStoreCartPageRoutingModule } from './company-store-cart-routing.module';

import { CompanyStoreCartPage } from './company-store-cart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanyStoreCartPageRoutingModule
  ],
  declarations: [CompanyStoreCartPage]
})
export class CompanyStoreCartPageModule {}
