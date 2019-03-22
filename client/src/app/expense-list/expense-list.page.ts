import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { ModalController } from '@ionic/angular';
import { ExpenseModalPage } from '../expense-modal/expense-modal.page';
import { Expense } from '../models/Expense';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.page.html',
  styleUrls: ['./expense-list.page.scss'],
})
export class ExpenseListPage implements OnInit {

  constructor(public modalController: ModalController, public expenseService: ExpenseService) { }

  private expenses: Expense[] = [];

  ngOnInit() {
  this.expenseService.loadSaved();
  }

  async newExpense() {
  const modal: HTMLIonModalElement =
       await this.modalController.create({
          component: ExpenseModalPage,
          componentProps: { }
    });
     
    modal.onDidDismiss().then((result) => {
       if (result.data !== null) {
         console.log('The result: ', result);
         this.expenses.unshift(result.data);
         console.log(this.expenses);
       }
    });
    
    return await modal.present();
  
  }

  async removeExpense(id: number) {
  
  }

}
