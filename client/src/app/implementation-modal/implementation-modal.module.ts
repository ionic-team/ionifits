import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ImplementationModalPage } from './implementation-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ImplementationModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ImplementationModalPage]
})
export class ImplementationModalPageModule {}
