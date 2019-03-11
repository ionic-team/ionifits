import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'employees',
        children: [
          {
            path: '',
            loadChildren: '../employee-list/employee-list.module#EmployeeListPageModule'
          },
          { path: 'detail/:id', loadChildren: '../employee-detail/employee-detail.module#EmployeeDetailPageModule' }
        ],
      },
      {
        path: 'expenses',
        children: [
          {
            path: '',
            loadChildren: '../expense-list/expense-list.module#ExpenseListPageModule'
          }
        ],
      },
      {
        path: 'timeoff',
        children: [
          {
            path: '',
            loadChildren: '../time-off/time-off.module#TimeOffPageModule'
          }
        ],
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: '../settings/settings.module#SettingsPageModule'
          }
        ],
      },
      {
        path: '',
        redirectTo: '/tabs/employees',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/employees',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
