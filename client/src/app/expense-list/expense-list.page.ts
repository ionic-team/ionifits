import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { ModalController } from '@ionic/angular';
import { ExpenseModalPage } from '../expense-modal/expense-modal.page';
import { Expense } from '../models/expense';
import { ImplementationModalPage } from '../implementation-modal/implementation-modal.page';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.page.html',
  styleUrls: ['./expense-list.page.scss'],
})
export class ExpenseListPage implements OnInit {

  constructor(public modalController: ModalController, public expenseService: ExpenseService) { }

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
      componentProps: { 
        "description": "Complete expense management implementation (CRUD). Native device features include Camera and Filesystem access.",
        "uiComps": [
          "List (<ion-list>): Display all completed expenses.", 
          "Sliding Item (<ion-item-sliding>): An item that can be dragged to reveal buttons. Drag right to left on an expense item to delete it.",
          "Modal (<ion-modal>): A dialog that appears on top of the current page's content. Tap on an expense item to edit its details.",
          "Floating Action Button (<ion-fab>): Tap to create a new expense item.",
          "Grid (<ion-grid>): A powerful mobile-first flexbox system for building custom layouts. Used to center the 'No expenses found' messaging."
          ],
        "nativeFeatures": [
         "Camera: Cordova plugin used to take expense receipt pictures on user's mobile device.",
         "File: Cordova plugin used to store expense receipt pictures on user's mobile device.",
         "Storage: Ionic Native plugin used to cache app data such as expense details for later retrieval."
        ]
      }
    });
     
    modal.onDidDismiss().then((result) => { });
    
    return await modal.present();
  }

}
