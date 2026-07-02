import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './employee.entity';

@Injectable()
export class EmployeesService {
  constructor(@InjectRepository(Employee) private readonly employees: Repository<Employee>) {}

  findAll(search?: string) {
    return this.employees.find({
      where: search ? [{ fullName: Like(`%${search}%`) }, { email: Like(`%${search}%`) }] : {},
      order: { fullName: 'ASC' },
    });
  }

  async findOne(id: number) {
    const employee = await this.employees.findOne({ where: { id } });
    if (!employee) throw new NotFoundException('Вработениот не е пронајден.');
    return employee;
  }

  create(dto: CreateEmployeeDto) {
    return this.employees.save(this.employees.create({ ...dto, isActive: dto.isActive ?? true }));
  }

  async update(id: number, dto: UpdateEmployeeDto) {
    const employee = await this.findOne(id);
    Object.assign(employee, dto);
    return this.employees.save(employee);
  }

  async remove(id: number) {
    const employee = await this.findOne(id);
    await this.employees.remove(employee);
    return { deleted: true };
  }
}
