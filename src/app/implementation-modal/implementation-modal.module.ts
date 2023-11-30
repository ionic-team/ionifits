import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ImplementationModalPage } from './implementation-modal.page';
import { IonHeader, IonToolbar, IonTitle, IonButton, IonContent, IonList, IonListHeader, IonLabel, IonItem, IonGrid, IonRow, IonCol, IonIcon } from "@ionic/angular/standalone";

const routes: Routes = [
    {
        path: '',
        component: ImplementationModalPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        IonHeader,
        IonToolbar,
        IonTitle,
        IonButton,
        IonContent,
        IonList,
        IonListHeader,
        IonLabel,
        IonItem,
        IonGrid,
        IonRow,
        IonCol,
        IonIcon
    ],
    declarations: [ImplementationModalPage]
})
export class ImplementationModalPageModule { }
