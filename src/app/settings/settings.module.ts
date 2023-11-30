import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SettingsPage } from './settings.page';
import { IonHeader, IonToolbar, IonTitle, IonIcon, IonContent, IonListHeader, IonLabel, IonList, IonItem, IonAvatar, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from "@ionic/angular/standalone";

const routes: Routes = [
    {
        path: '',
        component: SettingsPage
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
        IonItem,
        IonAvatar,
        IonButton,
        IonCard,
        IonCardHeader,
        IonCardSubtitle,
        IonCardTitle,
        IonCardContent
    ],
    declarations: [SettingsPage]
})
export class SettingsPageModule { }
