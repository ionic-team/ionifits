import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListPage } from './employee-list.page';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonTitle, IonContent, IonList, IonItem, IonAvatar, IonLabel, IonSpinner } from "@ionic/angular/standalone";

const routes: Routes = [
    {
        path: '',
        component: EmployeeListPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ScrollingModule,
        RouterModule.forChild(routes),
        IonHeader,
        IonToolbar,
        IonButtons,
        IonButton,
        IonIcon,
        IonTitle,
        IonContent,
        IonList,
        IonItem,
        IonAvatar,
        IonLabel,
        IonSpinner
    ],
    declarations: [EmployeeListPage]
})
export class EmployeeListPageModule { }
