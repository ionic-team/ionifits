import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/angular/standalone";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TabsPageRoutingModule,
        IonTabs,
        IonTabBar,
        IonTabButton,
        IonIcon,
        IonLabel
    ],
    declarations: [TabsPage]
})
export class TabsPageModule { }
