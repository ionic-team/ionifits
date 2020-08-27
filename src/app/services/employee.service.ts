import { Injectable } from '@angular/core';
import { from, Observable, timer } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { data } from '../../data/employeeData.js';
import { Employee } from '../models/employee.js';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees$: Observable<Employee[]>;
  cache: Employee[][] = [];

  constructor() {
    this.employees$ = from([]);
  }

  private getData(page: number, pageSize: number) {
    return data.slice(page * pageSize, page * pageSize + pageSize);
  }

  getEmployees(page = 0, pageSize = 100) {
    return timer(this.cache.length === 0 ? 0 : 1000).pipe(
      tap(_ => (this.cache[page] = this.getData(page, pageSize))),
      map(_ => {
        return this.cache.reduce((acc, current) => {
          return acc.concat(current);
        }, []);
      })
    );
  }

  getEmployee(id: number) {
    return new Observable<Employee>(subscriber => {
      setTimeout(() => {
        const employee = data.find(x => x.id === id);
        subscriber.next(employee);
        subscriber.complete();
      }, 0);
    });
  }
}
