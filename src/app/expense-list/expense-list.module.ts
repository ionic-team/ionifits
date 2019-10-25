import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ExpenseListPage } from './expense-list.page';

const routes: Routes = [
  {
    path: '',
    component: ExpenseListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
    
  ],
  declarations: [ExpenseListPage]
})
export class ExpenseListPageModule {}
