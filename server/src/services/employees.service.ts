import { Injectable } from '@nestjs/common';
import { data } from './employeeData';
import { Employee } from 'src/models/employee';

@Injectable()
export class EmployeesService {
  getAll(sort?: string, page = 0, pageSize = 10000) {
    const sorted = sort ? data.sort(compare) : data;
    const paged = sorted.slice(page * pageSize, page * pageSize + pageSize);
    return new Promise((resolve, reject) => {
      resolve(paged);
    });

    function compare(a: Employee, b: Employee) {
      if (a[sort] < b[sort]) {
        return -1;
      }
      if (a[sort] > b[sort]) {
        return 1;
      }
      return 0;
    }
  }

  getEmployee(id: number) {
    return new Promise((resolve, reject) => {
      const employee = data.find(x => x.id === id);
      resolve(employee);
    });
  }
}
