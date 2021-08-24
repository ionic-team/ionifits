import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { CompanyStoreCartPage } from '../company-store-cart/company-store-cart.page';
import { Product } from '../models/product';
import { companyStoreProducts } from 'src/data/storeData';

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
    autoplay: false,
    zoom: true, 
    grabCursor: true
  }

  public cart: Product[] = [];
  public products: Product[] = [];
  public newProducts: Product[] = [];
  public bestsellerProducts: Product[] = [];

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

    this.bestsellerProducts = companyStoreProducts.filter(p => p.saleCategory === "bestsellers");
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

    await this.presentToast(`${product.name} added`);
  }

  public calculateCartQuantity(): number {
    return this.cart.reduce((accumulator, current) => accumulator + current.quantity, 0);
  }

  async openCartModal(): Promise<void> {
    if (this.cart.length > 0) {
      const modal: HTMLIonModalElement = await this.modalController.create({
        component: CompanyStoreCartPage,
        swipeToClose: true,
        presentingElement: this.routerOutlet.nativeEl,
        componentProps: { 
          "productsInCart": this.cart 
        }
      });
      
      modal.onDidDismiss().then((result) => {
        this.presentToast(`Thanks for your order!`);
      });
      
      return await modal.present();
    }
  }

  private async presentToast(message): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: "tertiary"
    });
    
    await toast.present();
  }

  private async initProducts() {

  }

}
