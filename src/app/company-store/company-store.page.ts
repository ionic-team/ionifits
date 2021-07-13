import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { CompanyStoreCartPage } from '../company-store-cart/company-store-cart.page';
import { Product } from '../models/product';

@Component({
  selector: 'app-company-store',
  templateUrl: './company-store.page.html',
  styleUrls: ['./company-store.page.scss'],
})
export class CompanyStorePage implements OnInit {

  constructor(public toastController: ToastController, 
              public modalController: ModalController,
              private routerOutlet: IonRouterOutlet) { }

  slideOptions = {
    slidesPerView: "auto", 
    autoplay: true,
    zoom: true, 
    grabCursor: true
  }

  public cart: Product[] = [];
  public products: Product[] = [];
  public newProducts: Product[] = [];

  ngOnInit() {
    this.products.push({
      name: "Portals Shirt",
      price: 29,
      image: "/assets/store/portals-shirt.png",
      saleCategory: "new",
      quantity: 0
    });
    this.products.push({
      name: "Capacitor Shirt",
      price: 29,
      image: "/assets/store/capacitor-shirt.png",
      saleCategory: "new",
      quantity: 0
    });
    this.products.push({
      name: "Capacitor Sticker",
      price: 3,
      image: "/assets/store/capacitor-sticker.png",
      saleCategory: "new",
      quantity: 0
    });
    this.products.push({
      name: "Capacitor Water Bottle",
      price: 32,
      image: "/assets/store/capacitor-waterbottle.png",
      saleCategory: "new",
      quantity: 0
    });

    this.newProducts = this.products.filter(p => p.saleCategory === "new");
  }

  private async addToCart(product: Product): Promise<void> {
    const foundProduct = this.cart.find(p => p.name === product.name);
    if (foundProduct) {
      foundProduct.quantity += 1;
    } else {
      product.quantity = 1;
      this.cart.push(product);
    }

    await this.presentToast(product.name);
  }

  public calculateCartQuantity() {
    return this.cart.reduce((accumulator, current) => accumulator + current.quantity, 0);
  }

  async openCartModal() {
    const modal: HTMLIonModalElement = await this.modalController.create({
      component: CompanyStoreCartPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: { 
        "productsInCart": this.cart }
    });
     
    modal.onDidDismiss().then((result) => { });
    
    return await modal.present();
  }

  private async presentToast(productName) {
    const toast = await this.toastController.create({
      message: `${productName} added`,
      duration: 2000,
      color: "tertiary"
    });
    
    await toast.present();
  }

}
