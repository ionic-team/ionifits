import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from './login/login.page';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'tabs', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule) },
  { path: 'employee-detail', loadChildren: () => import('./employee-detail/employee-detail.module').then(m => m.EmployeeDetailPageModule) },
  { path: 'expense-modal', loadChildren: () => import('./expense-modal/expense-modal.module').then(m => m.ExpenseModalPageModule) },
  { path: 'implementation-modal', loadChildren: () => import('./implementation-modal/implementation-modal.module').then(m => m.ImplementationModalPageModule) },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
