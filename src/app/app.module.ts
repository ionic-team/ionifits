import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeService } from './services/employee.service';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { IonicStorageModule } from '@ionic/storage';
import { ExpenseModalPageModule } from './expense-modal/expense-modal.module';
import { ImplementationModalPageModule } from './implementation-modal/implementation-modal.module';
import { EmployeeFilterPageModule } from './employee-filter/employee-filter.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    NoopAnimationsModule,
    ScrollingModule,
    IonicStorageModule.forRoot(),
    ExpenseModalPageModule,
    ImplementationModalPageModule,
    EmployeeFilterPageModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    EmployeeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
