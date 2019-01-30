import { Controller, Get, Query, Param } from '@nestjs/common';
import { EmployeesService } from 'src/services/employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private employeeService: EmployeesService) {}

  @Get()
  getAll(@Query() query) {
    const page = query.page ? parseInt(query.page, 10) : undefined;
    const pageSize = query.pageSize ? parseInt(query.pageSize, 10) : undefined;
    return this.employeeService.getAll(query.sort, page, pageSize);
  }

  @Get(':id')
  getEmployee(@Param() params) {
    return this.employeeService.getEmployee(parseInt(params.id, 10));
  }
}
