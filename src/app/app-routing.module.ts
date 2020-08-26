import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule) },
  { path: 'employee-list', loadChildren: () => import('./employee-list/employee-list.module').then(m => m.EmployeeListPageModule) },
  { path: 'expense-list', loadChildren: () => import('./expense-list/expense-list.module').then(m => m.ExpenseListPageModule) },
  { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule) },
  { path: 'employee-detail', loadChildren: () => import('./employee-detail/employee-detail.module').then(m => m.EmployeeDetailPageModule) },
  { path: 'expense-modal', loadChildren: () => import('./expense-modal/expense-modal.module').then(m => m.ExpenseModalPageModule) },
  { path: 'implementation-modal', loadChildren: () => import('./implementation-modal/implementation-modal.module').then(m => m.ImplementationModalPageModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
