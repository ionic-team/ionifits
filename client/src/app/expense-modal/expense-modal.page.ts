import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, Platform } from '@ionic/angular';
import { Expense } from '../models/expense';
import { Photo } from '../models/photo';
import { ExpenseService } from '../services/expense.service';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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

  private newExpense: Expense = new Expense();
  private safeReceipt: any;

  ngOnInit() {
  if (!this.newExpense.date) {
  // Automatically select Today's date
  this.newExpense.date = new Date().toISOString().slice(0, 10);
  }

  if (this.platform.is("cordova")) {
  this.safeReceipt = this.webview.convertFileSrc("assets/image-placeholder.jpg");
//this.newExpense.receipt.data = this.webview.convertFileSrc("assets/image-placeholder.jpg");
  } else {
  this.safeReceipt = "assets/image-placeholder.jpg";
//this.newExpense.receipt.data = "assets/image-placeholder.jpg";
  }    
  }

  captureReceipt() {
    this.expenseService.captureExpenseReceipt().then((image) => {
      console.log("modal image: " + image);
      //const resolvedImg = this.webview.convertFileSrc(image);

      //this.safeReceipt = this.sanitizer.bypassSecurityTrustUrl(image);
      this.safeReceipt = this.sanitizer.bypassSecurityTrustUrl(image);
    });
  }

  async closeModal(cancelled) {
      await this.modalController.dismiss(cancelled ? null : this.newExpense);
  }

}
