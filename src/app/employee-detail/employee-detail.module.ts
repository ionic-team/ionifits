import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EmployeeDetailPage } from './employee-detail.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeeDetailPage
  }
];

@NgModule({
  imports: [CommonModule, IonicModule, RouterModule.forChild(routes), FormsModule],
  declarations: [EmployeeDetailPage],
  entryComponents: []
})
export class EmployeeDetailPageModule {}
