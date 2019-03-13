import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';
import { Expense } from '../models/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  public expenses: Expense[] = [];
  readonly EXPENSES: string = "expenses";
  
  constructor(private camera: Camera, private storage: Storage) { }
  
  loadSaved() {
    this.storage.get(this.EXPENSES).then((expenses) => {
      this.expenses = expenses || [];
    });
  }

  getAllExpenses() {

  }

  getExpense(id: number) {

  }

  captureExpenseReceipt() {

  }

  createNewExpense() {
  

  // Save all photos for later viewing
      this.storage.set(this.EXPENSES, this.expenses);
  }
}
