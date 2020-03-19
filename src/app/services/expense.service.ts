import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Expense } from '../models/expense';

import { Plugins, CameraResultType, CameraOptions } from '@capacitor/core';
const { Camera, Filesystem } = Plugins;

const EXPENSES = 'expenses';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private expenses: Expense[] = [];

  constructor(private storage: Storage) { }

  async loadSaved() {
    this.expenses = JSON.parse(await this.storage.get(EXPENSES)) || [];
    return this.expenses;
  }

  getExpense(id: number) {
    return this.expenses.find(expense => expense.id === id);
  }

  // Capture receipt image, stored in temporary storage on the device.
  async captureExpenseReceipt() {
    const options: CameraOptions = {
      quality: 100,
      resultType: CameraResultType.Base64
    };

    const imageData = await Camera.getPhoto(options);
    return `data:image/png;base64, ${imageData.base64String}`;
  }

  async createUpdateExpense(expense: Expense) {
    const isNewExpense = expense.id === undefined;
    const expenseId = expense.id || this.createExpenseId();

    // TODO: right now photos are just saved as base64 strings in storage
    // Could save filename in storage and then load base64 string from filesystem
    //
    // if (expense.receiptImage) {
    //   // delete the old receipt image
    //   if (!isNewExpense) {
    //     await Filesystem.deleteFile({ path: this.createReceiptPath(expenseId) });
    //   }

    //   const result = await Filesystem.writeFile({
    //     path: this.createReceiptPath(expenseId),
    //     data: expense.receiptImage
    //   });
    // }

    if (isNewExpense) {
      expense.id = expenseId;
      this.expenses.unshift(expense);
    }
    
    // Save all expenses
    this.storage.set(EXPENSES, JSON.stringify(this.expenses));
    
    return expense;
  }
  
  // Remove expense from local copy and Storage
  async removeExpense(expense: Expense, position: number) {
    this.expenses.splice(position, 1);
    await this.storage.set(EXPENSES, JSON.stringify(this.expenses));

    // Delete Receipt file on disk
    // if (expense.receiptImage) {
    //   await Filesystem.deleteFile({ path: this.createReceiptPath(expense.id) });
    // }
  }

  createExpenseId() {
    return new Date().getTime();
  }

  // createReceiptPath(expenseId: number) {
  //   return expenseId + '.png';
  // }
}
