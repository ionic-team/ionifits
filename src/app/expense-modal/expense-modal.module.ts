import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ExpenseModalPage } from './expense-modal.page';
import { IonHeader, IonToolbar, IonButton, IonTitle, IonContent, IonItem, IonInput, IonLabel, IonDatetimeButton, IonModal, IonDatetime, IonListHeader, IonList, IonSelect, IonSelectOption, IonFab, IonFabButton, IonIcon } from "@ionic/angular/standalone";

const routes: Routes = [
    {
        path: '',
        component: ExpenseModalPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        IonHeader,
        IonToolbar,
        IonButton,
        IonTitle,
        IonContent,
        IonItem,
        IonInput,
        IonLabel,
        IonDatetimeButton,
        IonModal,
        IonDatetime,
        IonListHeader,
        IonList,
        IonSelect,
        IonSelectOption,
        IonFab,
        IonFabButton,
        IonIcon
    ],
    declarations: [ExpenseModalPage]
})
export class ExpenseModalPageModule { }
