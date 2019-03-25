import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ExpenseModalPage } from './expense-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ExpenseModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ExpenseModalPage],
  entryComponents: [ExpenseModalPage]
})
export class ExpenseModalPageModule {}
