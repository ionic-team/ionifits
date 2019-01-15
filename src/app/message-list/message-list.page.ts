import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.page.html',
  styleUrls: ['./message-list.page.scss']
})
export class MessageListPage implements OnInit {
  constructor(private employeeService: EmployeeService) {}
  ngOnInit() {}
}
