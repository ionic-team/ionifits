import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { CompanyStoreCartPage } from '../company-store-cart/company-store-cart.page';
import { Product } from '../models/product';
import { companyStoreProducts } from 'src/data/storeData';
import { ImplementationModalPage } from '../implementation-modal/implementation-modal.page';

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
  public newProducts: Product[] = [];
  public bestsellerProducts: Product[] = [];
  public saleProducts: Product[] = [];
  public recommendedProducts: Product[] = [];

  ngOnInit() {
    this.initProducts();
  }

  private async addToCart(product: Product): Promise<void> {
    if (product.name !== "Ionic Headband") {
      const foundProduct = this.cart.find(p => p.name === product.name);
      if (foundProduct) {
        foundProduct.quantity += 1;
      } else {
        product.quantity = 1;
        this.cart.push(product);
      }

      await this.presentToast(`${product.name} added`);
    }
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
      duration: 2000,
      color: "tertiary"
    });
    
    await toast.present();
  }

  private initProducts() {
    this.bestsellerProducts = companyStoreProducts.filter(p => p.saleCategory === "bestsellers");
    this.newProducts = companyStoreProducts.filter(p => p.saleCategory === "new");
    this.saleProducts = companyStoreProducts.filter(p => p.saleCategory === "sale");
    this.recommendedProducts = companyStoreProducts.filter(p => p.saleCategory === "recommended");
  }

  async openImplModal() {
    const modal: HTMLIonModalElement = await this.modalController.create({
      component: ImplementationModalPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: { 
        "description": "E-commerce experience powered by Ionic Payments. Add products to the shopping cart then purchase with Apple or Google Pay.",
        "uiComps": [ {
          name: "Grid", icon: "grid", tag: "<ion-grid>", 
          description: "A powerful mobile-first flexbox system for building custom layouts. Used to display each Product for sale."
        },
        {
          name: "Slides", icon: "layers", tag: "<ion-slides>", 
          description: "Modern mobile swipe component powered by Swiper.js. Used to display each Product for sale."
        },
        ],
        "nativeFeatures": [
          {
            name: "Ionic Payments", icon: "card", runtime: "Ionic Enterprise",
            description: "Collect payments securely and efficiently with Apple and Google Pay. Purchase store products in the shopping cart using Payments."
          },
        ]
      }
    });
     
    modal.onDidDismiss().then((result) => { });
    
    return await modal.present();
  }
}
