import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'tabs', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule) },
  { path: 'employee-detail', loadChildren: () => import('./employee-detail/employee-detail.module').then(m => m.EmployeeDetailPageModule) },
  { path: 'expense-modal', loadChildren: () => import('./expense-modal/expense-modal.module').then(m => m.ExpenseModalPageModule) },
  { path: 'implementation-modal', loadChildren: () => import('./implementation-modal/implementation-modal.module').then(m => m.ImplementationModalPageModule) },
  {
    path: 'company-store',
    loadChildren: () => import('./company-store/company-store.module').then( m => m.CompanyStorePageModule)
  },
  {
    path: 'company-store-cart',
    loadChildren: () => import('./company-store-cart/company-store-cart.module').then( m => m.CompanyStoreCartPageModule)
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
