import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { ModalController } from '@ionic/angular';
import { ExpenseModalPage } from '../expense-modal/expense-modal.page';
import { Expense } from '../models/expense';
import { ImplementationModalPage } from '../implementation-modal/implementation-modal.page';
import { IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.page.html',
  styleUrls: ['./expense-list.page.scss'],
})
export class ExpenseListPage implements OnInit {

  constructor(public modalController: ModalController, public expenseService: ExpenseService, 
    private routerOutlet: IonRouterOutlet) { }

  public expenses: Expense[] = [];

  async ngOnInit() {
    this.expenses = await this.expenseService.loadSaved();
  }

  async openExpense(id) {
    return this.openExpenseModal(id);
  }

  async newExpense() {
    return this.openExpenseModal(null);
  }

  async openExpenseModal(expenseId) {
    const modal: HTMLIonModalElement = await this.modalController.create({
      component: ExpenseModalPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: { 
        "existingExpenseId": expenseId }
    });
     
    modal.onDidDismiss().then((result) => { });
    
    return await modal.present();
  }

  async removeExpense(expense, position) {
    await this.expenseService.removeExpense(expense, position);
  }

  async openImplModal() {
    const modal: HTMLIonModalElement = await this.modalController.create({
      component: ImplementationModalPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: { 
        "description": "Complete expense management implementation (CRUD). Native device features include Camera and Filesystem access.",
        "uiComps": [
          {
            name: "List", icon: "list", tag: "<ion-list>",
            description: "Display all completed expenses."
          }, {
            name: "Sliding Item", icon: "return-down-back", tag: "<ion-item-sliding>",
            description: "An item that can be dragged to reveal buttons. Drag right to left on an expense item to delete it."
          }, {
            name: "Modal", icon: "tablet-portrait", tag: "<ion-modal>",
            description: "A dialog that appears on top of the current page's content. Tap on an expense item to edit its details."
          }, {
            name: "FAB", icon: "add-circle-outline", tag: "<ion-fab>",
            description: "Floating Action Button. Tap to create a new expense item."
          }, {
            name: "Grid", icon: "grid", tag: "<ion-grid>", 
            description: "A powerful mobile-first flexbox system for building custom layouts. Used to center the 'No expenses found' messaging."
          }],
        "nativeFeatures": [
          {
            name: "Camera", icon: "camera", runtime: "Capacitor Core",
            description: "Used to take expense receipt pictures on user's mobile device."
          }, {
            name: "File", icon: "document", runtime: "Capacitor Core",
            description: "Used to store expense receipt pictures on user's mobile device."
          }, {
            name: "Storage", icon: "briefcase", runtime: "Capacitor Core",
            description: "Used to cache app data such as expense details for later retrieval."
          }
        ]
      }
    });
     
    modal.onDidDismiss().then((result) => { });
    
    return await modal.present();
  }

}
