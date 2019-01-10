import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Observable, concat, of } from 'rxjs';
import { Employee } from '../models/employee';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.page.html',
  styleUrls: ['./employee-list.page.scss']
})
export class EmployeeListPage implements OnInit {
  employees$: Observable<Employee[]>;
  employees: Employee[] = [];
  page = 0;

  constructor(private employeeService: EmployeeService) {}
  ngOnInit() {
    this.employeeService
      .getEmployees(this.page, 50)
      .subscribe(x => (this.employees = x));
  }

  loadData(event) {
    this.page += 1;
    this.employeeService.getEmployees(this.page).subscribe(x => {
      this.employees = x;
      event.target.complete();
    });
  }

  trackByFn(_, item) {
    return item.id;
  }

  scroll(event) {
    console.log('scroll');
  }
}
