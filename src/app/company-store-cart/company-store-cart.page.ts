import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-company-store-cart',
  templateUrl: './company-store-cart.page.html',
  styleUrls: ['./company-store-cart.page.scss'],
})
export class CompanyStoreCartPage implements OnInit {

  @Input() productsInCart: Product[];

  constructor() { }

  ngOnInit() {
    console.log(this.productsInCart);
  }

}
