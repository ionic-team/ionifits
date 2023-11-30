import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompanyStorePage } from './company-store.page';
import { RouterModule, Routes } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonHeader, IonToolbar, IonButtons, IonIcon, IonButton, IonBadge, IonTitle, IonContent, IonGrid, IonRow, IonCol } from "@ionic/angular/standalone";

const routes: Routes = [
    {
        path: '',
        component: CompanyStorePage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        IonHeader,
        IonToolbar,
        IonButtons,
        IonIcon,
        IonButton,
        IonBadge,
        IonTitle,
        IonContent,
        IonGrid,
        IonRow,
        IonCol
    ],
    declarations: [CompanyStorePage],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CompanyStorePageModule { }
