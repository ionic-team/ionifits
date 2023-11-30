import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { IonicRouteStrategy, provideIonicAngular, IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ScrollingModule } from '@angular/cdk/scrolling';

import { ExpenseModalPageModule } from './expense-modal/expense-modal.module';
import { ImplementationModalPageModule } from './implementation-modal/implementation-modal.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { SQLite } from '@ionic-enterprise/secure-storage/ngx';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        FormsModule,
        AppRoutingModule,
        ScrollingModule,
        ExpenseModalPageModule,
        ImplementationModalPageModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
        RouterModule,
        IonicStorageModule.forRoot({
            driverOrder: [Drivers.SecureStorage, Drivers.IndexedDB, Drivers.LocalStorage]
        }),
        IonApp,
        IonRouterOutlet
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        SQLite,
        provideIonicAngular()
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
