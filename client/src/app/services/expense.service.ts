import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';
import { Expense } from '../models/expense';
import { DomSanitizer } from '@angular/platform-browser';
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
    return this.expenses.find(expense => expense.id === id);
  }

  // Capture receipt image, stored in temporary storage on the device.
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
      sanitizedReceiptImage: this.sanitizer.bypassSecurityTrustUrl(resolvedImg),
      originalImage: imageData
    };
  }

  // Some Camera/File logic referenced from: https://devdactic.com/ionic-4-image-upload-storage/
  async createUpdateExpense(expense: Expense) {
    const isNewExpense = (expense.id === undefined) ? true : false;
    let expenseId = expense.id || 0;

    /* 
     * Create or update the receipt file.
     * 
     * The camera & file plugins are notoriously challenging to work with. Easiest path is to leverage Ionic Native's
     * deleteFile and copyFile methods: Delete the old receipt, then copy the new receipt image from temp 
     * storage into permanent file storage. In the process this changes the image filename, but that doesn't really matter.
    */
    if (expense.receipt.tempPath) {
      let tempReceiptFilePath = expense.receipt.tempPath;
      const tempFilename = tempReceiptFilePath.substr(tempReceiptFilePath.lastIndexOf('/') + 1);
      const tempBaseFilesystemPath = tempReceiptFilePath.substr(0, tempReceiptFilePath.lastIndexOf('/') + 1);

      let newFilename;
      const newFile = this.prepNewFile();
      newFilename = newFile.filename;
      expenseId = newFile.id;

      const oldFilePath = expense.receipt.filePath;
      if (oldFilePath) {
        // update existing receipt by deleting the old file first
        const oldFilename = oldFilePath.substr(oldFilePath.lastIndexOf('/') + 1);
        await this.deleteFile(oldFilePath, oldFilename);
      }

      const newBaseFilesystemPath = this.file.dataDirectory;
      await this.file.copyFile(tempBaseFilesystemPath, tempFilename, newBaseFilesystemPath, 
        newFilename);
      
      let receiptFilePath = newBaseFilesystemPath + newFilename;
      expense.receipt.filePath = receiptFilePath;
      // clear out placeholder image
      expense.receipt.tempPath = null;
      expense.receipt.name = newFilename;
      expense.receipt.webviewPath = this.webview.convertFileSrc(receiptFilePath);
    }

    if (isNewExpense) {
      expense.id = expenseId;
      this.expenses.unshift(expense);
    }
    
    // Save all expenses
    this.storage.set(EXPENSES, JSON.stringify(this.expenses));
    
    return expense;
  }
  
  // Remove expense from local copy and Storage
  async removeExpense(expense, position) {
    this.expenses.splice(position, 1);
    await this.storage.set(EXPENSES, JSON.stringify(this.expenses));

    // Delete Receipt file on disk
    if (expense.receipt && expense.receipt.name) {
      await this.deleteFile(expense.receipt.filePath, expense.receipt.name);
    }
  }

  async deleteFile(filePath, fileName) {
    const baseFilesystemPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
    await this.file.removeFile(baseFilesystemPath, fileName);
  }

  prepNewFile() {
    var d = new Date(),
        fileId = d.getTime(),
        newFileName = fileId + ".jpg";
    return {
      id: fileId,
      filename: newFileName
    };
  }
}