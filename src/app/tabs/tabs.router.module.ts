import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'employees',
        children: [
          { path: '', loadChildren: () => import('../employee-list/employee-list.module').then(m => m.EmployeeListPageModule) },
          { path: 'detail/:id', loadChildren: () => import('../employee-detail/employee-detail.module').then(m => m.EmployeeDetailPageModule) }
        ],
      },
      { path: 'expenses', loadChildren: () => import('../expense-list/expense-list.module').then(m => m.ExpenseListPageModule) },
      { path: 'settings', loadChildren: () => import('../settings/settings.module').then(m => m.SettingsPageModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
