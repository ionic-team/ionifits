import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Expense } from '../models/expense';
import { ExpenseService } from '../services/expense.service';
import { DomSanitizer } from '@angular/platform-browser';
import {Capacitor} from '@capacitor/core';

@Component({
  selector: 'app-expense-modal',
  templateUrl: './expense-modal.page.html',
  styleUrls: ['./expense-modal.page.scss'],
})
export class ExpenseModalPage implements OnInit {

  @Input() existingExpenseId: number;

  constructor(private modalController: ModalController,
              private sanitizer: DomSanitizer,
              private expenseService: ExpenseService) { }

  public newExpense: Expense = new Expense();
  public safeReceipt: any;

  ngOnInit() {
    if (this.existingExpenseId) {
      const foundExpense = this.expenseService.getExpense(this.existingExpenseId);
      this.newExpense = foundExpense;
    }

    this.setReceiptImage();

    if (!this.newExpense.date) {
      // Automatically select Today's date
      this.newExpense.date = new Date().toISOString();
    }
  }

  setReceiptImage() {
    if (this.newExpense.id && this.newExpense.receipt.webviewPath) {
      this.safeReceipt = this.sanitizeReceiptImage(this.newExpense.receipt.webviewPath);
    } else {
        this.safeReceipt = 
          Capacitor.isNative 
          ? Capacitor.convertFileSrc('assets/image-placeholder.jpg')
          : 'assets/image-placeholder.jpg';
    }
  }

  async captureReceipt() {
    const image = await this.expenseService.captureExpenseReceipt();
    this.newExpense.receipt.tempPath = image.filepath;
    this.safeReceipt = image.sanitizedReceiptImage;
  }

  async closeModal() {
    await this.modalController.dismiss(null);
  }

  async updateExpense() {
    const updatedExpense = await this.expenseService.createUpdateExpense(this.newExpense);
    this.modalController.dismiss(updatedExpense);
  }

  sanitizeReceiptImage(imagePath) {
    return this.sanitizer.bypassSecurityTrustUrl(imagePath);
  }
}
