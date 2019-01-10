import { Injectable } from '@angular/core';
import { from, Observable, pipe, timer } from 'rxjs';
import { take, flatMap, debounceTime, throttleTime, delay, map, tap } from 'rxjs/operators';
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

  getEmployees(page = 0, pageSize = 50) {

    // const employees = this.getData(page, pageSize);

    // const result = this.cache.reduce((acc, current) => {
    //   return acc.concat(current);
    // }, []);
    return timer(1000).pipe(
      tap(_ => this.cache[page] = this.getData(page, pageSize)),
      map(_ => {
        return this.cache.reduce((acc, current) => {
             return acc.concat(current);
          }, []);
      })

    );
  }
}
