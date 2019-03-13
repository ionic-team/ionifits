import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { ModalController } from '@ionic/angular';
import { ExpenseModalPage } from '../expense-modal/expense-modal.page';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.page.html',
  styleUrls: ['./expense-list.page.scss'],
})
export class ExpenseListPage implements OnInit {

  constructor(public modalController: ModalController, public expenseService: ExpenseService) { }

  ngOnInit() {
  this.expenseService.loadSaved();
  }

  async newExpense() {
  const modal: HTMLIonModalElement =
       await this.modalController.create({
          component: ExpenseModalPage,
          componentProps: { }
    });
     
    modal.onDidDismiss().then((detail) => {
       if (detail !== null) {
         console.log('The result: ', detail.data);
       }
    });
    
    return await modal.present();
  
  }

}
