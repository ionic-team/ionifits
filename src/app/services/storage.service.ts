import { Injectable } from '@angular/core';
import { Expense } from '../models/expense';
import { Capacitor } from '@capacitor/core';
import { SQLite, SQLiteObject } from '@ionic-enterprise/secure-storage/ngx';
import { Storage } from '@ionic/storage-angular';
import IonicSecureStorageDriver from '@ionic-enterprise/secure-storage/driver';
import { IdentityService } from './identity.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;
  private _database: SQLiteObject | null = null;
  private EXPENSES: string = "EXPENSES";

  constructor(private storage: Storage, private sqlite: SQLite, private identityService: IdentityService) {  }

  async init() {
    // Initialize Ionic Secure Storage on mobile and Ionic Storage on web
    if (Capacitor.getPlatform() === 'web') {
      await this.storage.defineDriver(IonicSecureStorageDriver);
      const storage = await this.storage.create();

      this._storage = storage;
    }
    else {
      // Obtain encryption key
      const encryptionKey = await this.identityService.getEncryptionKey();

      // Create the ionifits database
      try {
        this._database = await this.sqlite.create({ 
          name: "ionifits.db",
          location: "default",
          // Key/Password used to encrypt the database  
          key: encryptionKey
        });
    
        // Create the Expenses table
        await this._database.executeSql( 
          'CREATE TABLE IF NOT EXISTS expenses(id INTEGER PRIMARY KEY,category,merchant,note,cost,date,receipt)', []);
      } catch (e) {
        console.error('Unable to initialize database', e);
      }
    }
  }

  async readExpenses(): Promise<Expense[]> {
    if (Capacitor.getPlatform() === 'web') {
      const result = JSON.parse(await this._storage.get(this.EXPENSES)) || [];
      return result;
    }
    else {
      let expenses = [];

      await this._database.transaction(tx => {
        tx.executeSql('SELECT * from expenses', [], (tx, result) => {
          for (let i = 0; i < result.rows.length; i++) {
            let expense = result.rows.item(i);
            expense.receipt = JSON.parse(result.rows.item(i).receipt);
            
            expenses.push(expense);
          }
        });
      });

      return expenses;
    }
  }

  async createExpense(expense: Expense, allExpenses?) {
    if (Capacitor.getPlatform() === 'web') {
      await this._storage.set(this.EXPENSES, JSON.stringify(allExpenses));
    }
    else {
      await this.replaceExpense(expense);
    }
  }

  async updateExpense(expense: Expense, allExpenses?) {
    if (Capacitor.getPlatform() === 'web') {
      await this._storage.set(this.EXPENSES, JSON.stringify(allExpenses));
    }
    else {
      await this.replaceExpense(expense);
    }
  }

  // Insert or Update an expense
  private async replaceExpense(expense: Expense) {
    await this._database.transaction(tx => {
      tx.executeSql('REPLACE INTO expenses VALUES (?,?,?,?,?,?,?)', 
        [ expense.id, expense.category, expense.merchant, expense.note, expense.cost, expense.date, 
          JSON.stringify(expense.receipt)       
        ]);
    });
  }

  async deleteExpense(expense: Expense, allExpenses?) {
    if (Capacitor.getPlatform() === 'web') {
      await this._storage.set(this.EXPENSES, JSON.stringify(allExpenses));
    }
    else {
      await this._database.transaction(tx => { 
        tx.executeSql('DELETE FROM expenses WHERE id = ?', [expense.id], (tx, result) => {
            console.log('Rows affected: ' + result.rowsAffected);
          },
        );
      });
    }
  }
}
