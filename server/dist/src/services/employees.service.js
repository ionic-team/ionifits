"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const employeeData_1 = require("./employeeData");
let EmployeesService = class EmployeesService {
    getAll(sort, page = 0, pageSize = 10000) {
        const sorted = sort ? employeeData_1.data.sort(compare) : employeeData_1.data;
        const paged = sorted.slice(page * pageSize, page * pageSize + pageSize);
        return new Promise((resolve, reject) => {
            resolve(paged);
        });
        function compare(a, b) {
            if (a[sort] < b[sort]) {
                return -1;
            }
            if (a[sort] > b[sort]) {
                return 1;
            }
            return 0;
        }
    }
    getEmployee(id) {
        return new Promise((resolve, reject) => {
            const employee = employeeData_1.data.find(x => x.id === id);
            resolve(employee);
        });
    }
};
EmployeesService = __decorate([
    common_1.Injectable()
], EmployeesService);
exports.EmployeesService = EmployeesService;
//# sourceMappingURL=employees.service.js.map