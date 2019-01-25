import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.page.html',
  styleUrls: ['./employee-detail.page.scss']
})
export class EmployeeDetailPage implements OnInit, OnDestroy {
  id: number;
  fullName = '';
  avatarExpanded = false;
  employee: Employee | undefined;
  employeeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.params['id'], 10);
    this.employeeSubscription = this.employeeService.getEmployee(this.id).subscribe(employee => {
      this.employee = employee;
      this.fullName = employee.firstName + ' ' + employee.lastName;
    });
  }

  ngOnDestroy() {
    this.employeeSubscription.unsubscribe();
  }

  expandAvatar(event) {
    event.stopPropagation();
    this.avatarExpanded = !this.avatarExpanded;
  }
}
