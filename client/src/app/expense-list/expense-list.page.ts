import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { ModalController } from '@ionic/angular';
import { ExpenseModalPage } from '../expense-modal/expense-modal.page';
import { Expense } from '../models/expense';

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
      componentProps: { "existingExpenseId": expenseId }
    });
     
    modal.onDidDismiss().then((result) => { });
    
    return await modal.present();
  }

  async removeExpense(expense, position) {
    await this.expenseService.removeExpense(expense, position);
  }

}
