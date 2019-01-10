import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.page.html',
  styleUrls: ['./message-list.page.scss'],
})
export class MessageListPage implements OnInit {
  employees$: Observable<Employee[]>;
  employees: Employee[] = [];
  page = 0;

  constructor(private employeeService: EmployeeService) {}
  ngOnInit() {
    this.employeeService
      .getEmployees(this.page, 1300)
      .subscribe(x => (this.employees = x));
  }

  loadData(event) {
    this.page += 1;
    this.employeeService.getEmployees(this.page).subscribe(x => {
      this.employees = x;
      event.target.complete();
    });
  }

}
