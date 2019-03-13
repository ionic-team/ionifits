import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'employee-list', loadChildren: './employee-list/employee-list.module#EmployeeListPageModule' },
  { path: 'expense-list', loadChildren: './expense-list/expense-list.module#ExpenseListPageModule' },
  { path: 'time-off', loadChildren: './time-off/time-off.module#TimeOffPageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'employee-detail', loadChildren: './employee-detail/employee-detail.module#EmployeeDetailPageModule' },
  { path: 'expense-modal', loadChildren: './expense-modal/expense-modal.module#ExpenseModalPageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
