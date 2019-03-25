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

  private newExpense: Expense = new Expense();

  ngOnInit() {
  if (!this.newExpense.date) {
  // Automatically select Today's date
  this.newExpense.date = new Date().toISOString().slice(0, 10);
  }
  }

  async captureReceipt() {

  }

  async closeModal(cancelled) {
      await this.modalController.dismiss(cancelled ? null : this.newExpense);
  }

}
