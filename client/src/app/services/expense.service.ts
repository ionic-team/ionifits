import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';
import { Expense } from '../models/expense';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File } from '@ionic-native/file/ngx';

const EXPENSES: string = "expenses";

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private expenses: Expense[] = [];
  
  constructor(private camera: Camera, private storage: Storage, 
              private sanitizer: DomSanitizer, private webview: WebView, 
              private file: File) { }
  
  async loadSaved() {
    this.expenses = JSON.parse(await this.storage.get(EXPENSES)) || [];
    return this.expenses;
  }

  getExpense(id: number) {

  }

  async captureExpenseReceipt() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    const imageData = await this.camera.getPicture(options);
    const resolvedImg = this.webview.convertFileSrc(imageData);
    return {
      sanitized: this.sanitizer.bypassSecurityTrustUrl(resolvedImg),
      original: imageData
    };
  }

  // https://devdactic.com/ionic-4-image-upload-storage/
  async createNewExpense(expense: Expense) {
    const newFile = this.createFileName();
    expense.id = newFile.id;
    
    if (expense.receipt && expense.receipt.filePath) {
      const imagePath = expense.receipt.filePath;
      const currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      const correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      
      await this.file.copyFile(correctPath, currentName, this.file.dataDirectory, newFile.filename);

      let filePath = this.file.dataDirectory + newFile.filename;
      expense.receipt.name = newFile.filename;
      expense.receipt.filePath = filePath;
      expense.receipt.webviewPath = this.webview.convertFileSrc(filePath);
    }

    // Save all expenses
    this.expenses.unshift(expense);
    this.storage.set(EXPENSES, JSON.stringify(this.expenses));

    return expense;
  }

  async removeExpense(expense, position) {
    // Remove expense from local copy and Storage
    this.expenses.splice(position, 1);
    await this.storage.set(EXPENSES, JSON.stringify(this.expenses));

    // Delete Receipt file on disk
    if (expense.receipt && expense.receipt.name) {
      const correctPath = expense.receipt.filePath.substr(0, expense.receipt.filePath.lastIndexOf('/') + 1);
  
      await this.file.removeFile(correctPath, expense.receipt.name);
    }
  }

  createFileName() {
    var d = new Date(),
        fileId = d.getTime(),
        newFileName = fileId + ".jpg";
    return {
      id: fileId,
      filename: newFileName
    };
  }
}