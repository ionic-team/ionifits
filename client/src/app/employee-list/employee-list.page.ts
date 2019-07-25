import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Observable, concat, of, BehaviorSubject } from 'rxjs';
import { Employee } from '../models/employee';
import { tap, throttleTime, mergeMap, scan, map } from 'rxjs/operators';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ImplementationModalPage } from '../implementation-modal/implementation-modal.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.page.html',
  styleUrls: ['./employee-list.page.scss']
})
export class EmployeeListPage implements OnInit {
  employees: Employee[] = [];
  employees$: Observable<Employee[]>;
  page = 0;
  showLoading = false;
  pager$ = new BehaviorSubject(undefined);
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;

  constructor(private employeeService: EmployeeService, public modalController: ModalController) {}
  ngOnInit() {
    const batchMap = this.pager$.pipe(
      throttleTime(500),
      tap(_ => (this.page += 1)),
      tap(_ => (this.showLoading = true)),
      mergeMap(page => this.employeeService.getEmployees(page)),
      tap(_ => (this.showLoading = false)),
      scan((acc, batch) => {
        return { ...acc, ...batch };
      }, {})
    );

    this.employees$ = batchMap.pipe(map(v => Object.values(v)));
    this.employees$.subscribe(x => (this.employees = x));
  }

  trackByFn(_, item) {
    return item.id;
  }

  checkNextPage(e, offset) {
    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();

    if (total === 0) {
      return;
    }
    if (end === total) {
      this.pager$.next(this.page);
    }
  }

  async openImplModal() {
    const modal: HTMLIonModalElement = await this.modalController.create({
      component: ImplementationModalPage,
      componentProps: { 
        "description": "High performance infinite scrolling in a list containing hundreds of items.",
        "uiComps": [
          "List (<ion-list>): Display all employee data.", 
          "Avatar (<ion-avatar): Circular components that wrap an image or icon. Displays employee profile picture.",
          "Virtual Scroll (Angular CDK: <cdk-virtual-scroll-viewport>): Displays large lists of elements performantly by only rendering the items that fit on-screen."
          ],
        "nativeFeatures": ""
      }
    });
     
    modal.onDidDismiss().then((result) => { });
    
    return await modal.present();
  }
}
