import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-store',
  templateUrl: './company-store.page.html',
  styleUrls: ['./company-store.page.scss'],
})
export class CompanyStorePage implements OnInit {

  constructor() { }

  slideOptions = {
    slidesPerView: "auto", 
    autoplay: true,
    zoom: true, 
    grabCursor: true
  }

  ngOnInit() {
  }

}
