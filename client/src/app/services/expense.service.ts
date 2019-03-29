import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';
import { Expense } from '../models/expense';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File } from '@ionic-native/file/ngx';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  public expenses: Expense[] = [];
  readonly EXPENSES: string = "expenses";
  
  constructor(private camera: Camera, private storage: Storage, 
  private sanitizer: DomSanitizer, private webview: WebView, private file: File) { }
  
  loadSaved() {
    this.storage.get(this.EXPENSES).then((expenses) => {
      this.expenses = expenses || [];
    });
  }

  getAllExpenses() {

  }

  getExpense(id: number) {

  }

  captureExpenseReceipt(): Promise<any> {
    return new Promise((resolve, reject) => {
      const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.NATIVE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
          }
      
      this.camera.getPicture(options)
        .then((imageData) => {
            console.log("expense service og image: " + imageData);
            
            this.file.resolveLocalFilesystemUrl(imageData)
              .then((retrievedFile) => {
                console.log("file retrieval: " + retrievedFile.fullPath);
                resolve(retrievedFile.fullPath);
              });
          }, (err) => {
          // Handle error
          reject("Camera issue: " + err);
          });
      console.log("end capture");
    });
  }

  createNewExpense() {
  

  // Save all photos for later viewing
      this.storage.set(this.EXPENSES, this.expenses);
  }
}
