import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-filter',
  templateUrl: './employee-filter.page.html',
  styleUrls: ['./employee-filter.page.scss'],
})
export class EmployeeFilterPage implements OnInit {
  departments: string[] = [];
  offices: string[] = [];
  selectedDept: string = "Any";
  selectedOffice: string = "Any";

  constructor(private employeeService: EmployeeService, public modalCtrl: ModalController) { }

  async ngOnInit() {
    this.departments = await this.employeeService.getAllUniqueValues("department");
    this.offices = await this.employeeService.getAllUniqueValues("office");

    this.selectedDept = localStorage.department || this.selectedDept;
    this.selectedOffice = localStorage.office || this.selectedOffice;
  }

  applyFilters() {
    // Save user's new selections
    localStorage.department = this.selectedDept;
    localStorage.office = this.selectedOffice;

    this.modalCtrl.dismiss({
      department: this.selectedDept,
      office: this.selectedOffice
    });
  }

  clearFilters() {
    this.selectedDept = "Any";
    this.selectedOffice = "Any";
  }
}