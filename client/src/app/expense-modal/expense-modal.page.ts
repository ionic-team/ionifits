import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, Platform } from '@ionic/angular';
import { Expense } from '../models/expense';
import { ExpenseService } from '../services/expense.service';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-expense-modal',
  templateUrl: './expense-modal.page.html',
  styleUrls: ['./expense-modal.page.scss'],
})
export class ExpenseModalPage implements OnInit {

  constructor(private modalController: ModalController,
              private navParams: NavParams,
              private platform: Platform,
              private webview: WebView,
              private expenseService: ExpenseService, private sanitizer: DomSanitizer,) { }

  public newExpense: Expense = new Expense();
  public safeReceipt: any;

  ngOnInit() {
    if (!this.newExpense.date) {
      // Automatically select Today's date
      this.newExpense.date = new Date().toISOString().slice(0, 10);
    }

    if (this.platform.is("cordova")) {
      this.safeReceipt = this.webview.convertFileSrc("assets/image-placeholder.jpg");
    } else {
      this.safeReceipt = "assets/image-placeholder.jpg";
    }
  }

  async captureReceipt() {
    const image = await this.expenseService.captureExpenseReceipt();
    
    this.newExpense.receipt.filePath = image.original;
    this.safeReceipt = image.sanitized;
  }

  async closeModal() {
    await this.modalController.dismiss(null);
  }

  async createExpense() {
    const updatedExpense = await this.expenseService.createNewExpense(this.newExpense);
    this.modalController.dismiss(updatedExpense);
  }

}
