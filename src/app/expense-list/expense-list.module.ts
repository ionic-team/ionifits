import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ExpenseListPage } from './expense-list.page';
import { IonHeader, IonToolbar, IonTitle, IonIcon, IonContent, IonListHeader, IonLabel, IonList, IonItemSliding, IonItem, IonAvatar, IonImg, IonNote, IonItemOptions, IonItemOption, IonGrid, IonRow, IonCol, IonFab, IonFabButton } from "@ionic/angular/standalone";

const routes: Routes = [
    {
        path: '',
        component: ExpenseListPage
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
        IonIcon,
        IonContent,
        IonListHeader,
        IonLabel,
        IonList,
        IonItemSliding,
        IonItem,
        IonAvatar,
        IonImg,
        IonNote,
        IonItemOptions,
        IonItemOption,
        IonGrid,
        IonRow,
        IonCol,
        IonFab,
        IonFabButton
    ],
    declarations: [ExpenseListPage]
})
export class ExpenseListPageModule { }
