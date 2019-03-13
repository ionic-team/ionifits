import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Expense } from '../models/expense';

@Component({
  selector: 'app-expense-modal',
  templateUrl: './expense-modal.page.html',
  styleUrls: ['./expense-modal.page.scss'],
})
export class ExpenseModalPage implements OnInit {

  constructor(private modalController: ModalController,
              private navParams: NavParams) { }

  private newExpense: Expense;

  ngOnInit() {
  
  }

  async captureReceipt() {

  }

  async closeModal() {
    await this.modalController.dismiss(this.newExpense);
  }

}
