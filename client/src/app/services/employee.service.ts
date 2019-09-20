import { Injectable } from '@angular/core';
import { from, Observable, pipe, timer } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { data } from '../../data/employeeData.js';
import { Employee } from '../models/employee.js';

import {
  CordovaEngine,
  Database,
  DatabaseConfiguration,
  DataSource,
  IonicCBL,
  Meta,
  MutableDocument,
  Ordering,
  QueryBuilder,
  SelectResult,
  Expression
} from '@ionic-enterprise/couchbase-lite';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees$: Observable<Employee[]>;
  cache: Employee[][] = [];

  private database: Database;
  private readyPromise: Promise<void>;

  constructor() {
    this.employees$ = from([]);

    this.readyPromise = this.initializeDatabase();
    this.seedInitialData();
  }

  private async initializeDatabase(): Promise<void> {
    return new Promise(resolve => {
      IonicCBL.onReady(async () => {
        const config = new DatabaseConfiguration();
        config.setEncryptionKey('8e31f8f6-60bd-482a-9c70-69855dd02c38');
        this.database = new Database('employees', config);
        this.database.setEngine(
          new CordovaEngine({
            allResultsChunkSize: 9999
          })
        );
        await this.database.open();
        resolve();
      });
    });
  }

  private async seedInitialData() {
    await this.readyPromise;

    let count = await this.getDatabaseCount();
    if (count === 0) {
        const smallData = data.slice(0, 200);
        for (let emp of smallData) {
          let doc = new MutableDocument()
            .setNumber('id', emp.id)
            .setString('firstName', emp.firstName)
            .setString('lastName', emp.lastName)
            .setString('title', emp.title)
            .setString('office', emp.office)
            .setString('department', emp.department);
          
          this.database.save(doc);
        }
    }

    count = await this.getDatabaseCount();
  }

  async filterData(office, department, firstName) {
    await this.readyPromise;

    // Office and Department filters: Despite always passing their values to Couchbase directly as-is, make 
    // them fuzzy so as to support the case when user selects "Any"
    const query = QueryBuilder.select(SelectResult.all())
      .from(DataSource.database(this.database))
      .where(Expression.property("office").like(this.formatWildcardExpression(office))
        .and(Expression.property("department").like(this.formatWildcardExpression(department)))
        .and(Expression.property("firstName").like(this.formatWildcardExpression(firstName)))
        )
      .orderBy(Ordering.property('lastName').ascending());
    
    const results = await (await query.execute()).allResults();

    let filteredEmployees = [];
    for (var key in results) {
      // SelectResult.all() gives all properties, but puts them into an odd JSON format:
      // [ { "*": { id: "1", firstName: "Matt" } }, { "*": { id: "2", firstName: "Max" } }]
      var singleEmp = results[key]["*"];

      filteredEmployees.push(singleEmp);
    }

    return filteredEmployees;
  }

  private async getDatabaseCount() {
    const query = QueryBuilder.select(SelectResult.all())
      .from(DataSource.database(this.database));
    
    const result = await query.execute();
    const count = (await result.allResults()).length;
    console.log(`DB total records: ${count}`);
    return count;
  }

  public async getAllUniqueValues(documentPropertyName) {
    const query = QueryBuilder.selectDistinct(
        SelectResult.property(documentPropertyName))
      .from(DataSource.database(this.database))
      .orderBy(Ordering.property(documentPropertyName).ascending());
    
    const results = await (await query.execute()).allResults();
    let uniqueValues = results.map(x => x[documentPropertyName]);
    uniqueValues.unshift("Any");
    return uniqueValues;
  }

  private formatWildcardExpression(propValue) {
    return Expression.string(`%${propValue === "Any" ? "" : propValue}%`);
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
