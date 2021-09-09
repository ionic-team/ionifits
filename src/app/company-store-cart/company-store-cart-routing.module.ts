import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyStoreCartPage } from './company-store-cart.page';

const routes: Routes = [
  {
    path: '',
    component: CompanyStoreCartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyStoreCartPageRoutingModule {}
