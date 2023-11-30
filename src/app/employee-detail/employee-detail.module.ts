import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDetailPage } from './employee-detail.page';
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonList, IonItem, IonAvatar, IonIcon, IonLabel } from "@ionic/angular/standalone";

const routes: Routes = [
    {
        path: '',
        component: EmployeeDetailPage
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), FormsModule, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonList, IonItem, IonAvatar, IonIcon, IonLabel],
    declarations: [EmployeeDetailPage]
})
export class EmployeeDetailPageModule { }
