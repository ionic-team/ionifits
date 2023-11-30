import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompanyStoreCartPageRoutingModule } from './company-store-cart-routing.module';

import { CompanyStoreCartPage } from './company-store-cart.page';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonThumbnail, IonLabel, IonNote, IonButton, IonImg } from "@ionic/angular/standalone";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CompanyStoreCartPageRoutingModule,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonList,
        IonItem,
        IonThumbnail,
        IonLabel,
        IonNote,
        IonButton,
        IonImg
    ],
    declarations: [CompanyStoreCartPage]
})
export class CompanyStoreCartPageModule { }
