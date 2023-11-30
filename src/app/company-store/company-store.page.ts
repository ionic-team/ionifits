import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ToastController } from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular/standalone';
import { CompanyStoreCartPage } from '../company-store-cart/company-store-cart.page';
import { Product } from '../models/product';
import { companyStoreProducts } from 'src/data/storeData';
import { ImplementationModalPage } from '../implementation-modal/implementation-modal.page';
import { Haptics } from '@capacitor/haptics';
import { Platform } from '@ionic/angular/standalone';
import { IonicSlides } from '@ionic/angular/standalone';
import { addIcons } from "ionicons";
import { informationCircleOutline, cart } from "ionicons/icons";

@Component({
    selector: 'app-company-store',
    templateUrl: './company-store.page.html',
    styleUrls: ['./company-store.page.scss'],
})
export class CompanyStorePage implements OnInit {

    constructor(public toastController: ToastController,
        public modalController: ModalController,
        private routerOutlet: IonRouterOutlet,
        private platform: Platform) {
        addIcons({ informationCircleOutline, cart });
    }
    public cart: Product[] = [];
    public newProducts: Product[] = [];
    public bestsellerProducts: Product[] = [];
    public saleProducts: Product[] = [];
    public recommendedProducts: Product[] = [];
    public isDesktop: boolean = false;
    swiperModules = [IonicSlides];

    ngOnInit() {
        this.initProducts();

        this.isDesktop = this.platform.is("desktop");
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

            await this.triggerHapticFeedback();
            await this.presentToast(`${product.name} added`);
        }
    }

    private triggerHapticFeedback = async () => {
        await Haptics.vibrate();
    };

    public calculateCartQuantity(): number {
        return this.cart.reduce((accumulator, current) => accumulator + current.quantity, 0);
    }

    async openCartModal(): Promise<void> {
        if (this.cart.length > 0) {
            const modal: HTMLIonModalElement = await this.modalController.create({
                component: CompanyStoreCartPage,
                presentingElement: this.routerOutlet.nativeEl,
                componentProps: {
                    "productsInCart": this.cart
                }
            });

            modal.onDidDismiss().then((result) => {
                // Data will be undefined if cart was swiped closed or back button used
                if (result.data) {
                    this.cart.length = 0;
                    this.presentToast(`Thanks for your order!`);
                }
            });

            return await modal.present();
        }
    }

    private async presentToast(message): Promise<void> {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000,
            color: "tertiary",
            positionAnchor: "main-tabbar"
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
            presentingElement: this.routerOutlet.nativeEl,
            componentProps: {
                "description": "E-commerce experience powered by Ionic Payments. Add products to the shopping cart then purchase with Apple or Google Pay.",
                "uiComps": [{
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
