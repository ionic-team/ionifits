import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesController } from './employees.controller';

describe('Employees Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [EmployeesController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: EmployeesController = module.get<EmployeesController>(EmployeesController);
    expect(controller).toBeDefined();
  });
});
