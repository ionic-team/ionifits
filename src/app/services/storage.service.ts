import { Injectable } from '@angular/core';
import { Expense } from '../models/expense';
import { Capacitor } from '@capacitor/core';
import { SQLite, SQLiteObject } from '@ionic-enterprise/secure-storage/ngx';
import { Storage } from '@ionic/storage-angular';
import IonicSecureStorageDriver from '@ionic-enterprise/secure-storage/driver';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;
  private _database: SQLiteObject | null = null;
  private EXPENSES: string = "EXPENSES";

  constructor(private storage: Storage, private sqlite: SQLite) {
    this.init();
  }

  async init() {
    // Get encryption key
    // TODO - generate GUID once and store in IV
    // load from IV
    // OR: if accessing data later or inspecting the sqlite database, generate it from the server
    const encryptionKey = "TODO";

    // Initialize Ionic Secure Storage on mobile and Ionic Storage on web
    if (Capacitor.getPlatform() === 'web') {
      await this.storage.defineDriver(IonicSecureStorageDriver);
      //this.storage.setEncryptionKey(encryptionKey);
      const storage = await this.storage.create();

      this._storage = storage;
    }
    else {
      // Create the ionifits database
      try {
        this._database = await this.sqlite.create({
          name: "ionifits.db",
          location: "default",
          // Key/Password used to encrypt the database
          // Strongly recommended to use Identity Vault to manage this
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

      this._database.transaction(tx => {
        tx.executeSql('SELECT * from expenses', [], (tx, result) => {
          for (let i = 0; i < result.rows.length; i++) {
            expenses.push(result.rows.item(i));
          }
        });
      });

      return expenses;
    }
  }

  async createExpense(expense: Expense) {
    if (Capacitor.getPlatform() === 'web') {
      const allExpenses = await this.readExpenses();
      allExpenses.unshift(expense);
      await this._storage.set(this.EXPENSES, JSON.stringify(allExpenses));
    }
  }

  async updateExpense(newExpense: Expense, allExpenses?) {
    if (Capacitor.getPlatform() === 'web') {
      await this._storage.set(this.EXPENSES, JSON.stringify(allExpenses));
    }
    else {
      this._database.transaction(tx => {
        //let placeholders = Object.keys((expense) => '(?)').join(',');
  
        // REPLACE INTO
        // https://www.sqlitetutorial.net/sqlite-replace-statement/
        tx.executeSql('INSERT INTO expenses VALUES (?,?,?,?,?,?,?)', Object.values(newExpense));
      });
    }
  }

  async deleteExpense(expense: Expense) {
    this._database.transaction(tx => {
      tx.executeSql('DELETE FROM expenses WHERE id = ?', [expense.id], (tx, result) => {
          console.log('Rows affected: ' + result.rowsAffected);
        },
      );
    });
  }

}
