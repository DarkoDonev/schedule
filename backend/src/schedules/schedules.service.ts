import { BadRequestException, Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ExcelJS from 'exceljs';
import { In, Not, Repository } from 'typeorm';
import { Employee } from '../employees/employee.entity';
import { ShiftType } from '../shift-types/shift-type.entity';
import { GenerateScheduleDto } from './dto/generate-schedule.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule } from './entities/schedule.entity';
import { ShiftAssignment } from './entities/shift-assignment.entity';
import { ScheduleGeneratorService } from './schedule-generator.service';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule) private readonly schedules: Repository<Schedule>,
    @InjectRepository(ShiftAssignment) private readonly assignments: Repository<ShiftAssignment>,
    @InjectRepository(Employee) private readonly employees: Repository<Employee>,
    @InjectRepository(ShiftType) private readonly shiftTypes: Repository<ShiftType>,
    private readonly generator: ScheduleGeneratorService,
  ) {}

  findAll() {
    return this.schedules.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: number) {
    const schedule = await this.schedules.findOne({
      where: { id },
      relations: { assignments: true },
      order: { assignments: { date: 'ASC' } },
    });
    if (!schedule) throw new NotFoundException('Распоредот не е пронајден.');
    schedule.assignments.sort((a, b) => a.date.localeCompare(b.date) || a.employee.fullName.localeCompare(b.employee.fullName));
    return schedule;
  }

  async generate(dto: GenerateScheduleDto) {
    const schedule = await this.generator.buildSchedule(dto);
    return this.schedules.manager.transaction((manager) => manager.save(Schedule, schedule));
  }

  async regenerate(id: number) {
    const current = await this.findOne(id);
    const employeeIds = [...new Set(current.assignments.map((assignment) => assignment.employeeId))];
    const shiftTypeIds = [...new Set(current.assignments.map((assignment) => assignment.shiftTypeId))];
    const rebuilt = await this.generator.buildSchedule({
      title: current.title,
      startDate: current.startDate,
      endDate: current.endDate,
      employeeIds,
      shiftTypeIds,
    });

    return this.schedules.manager.transaction(async (manager) => {
      await manager.delete(ShiftAssignment, { scheduleId: id });
      current.assignments = rebuilt.assignments;
      return manager.save(Schedule, current);
    });
  }

  async update(id: number, dto: UpdateScheduleDto) {
    const schedule = await this.findOne(id);
    Object.assign(schedule, dto);
    return this.schedules.save(schedule);
  }

  async remove(id: number) {
    const schedule = await this.findOne(id);
    await this.schedules.remove(schedule);
    return { deleted: true };
  }

  async updateAssignment(scheduleId: number, assignmentId: number, dto: UpdateAssignmentDto) {
    const assignment = await this.assignments.findOne({ where: { id: assignmentId, scheduleId } });
    if (!assignment) throw new NotFoundException('Задачата не е пронајдена.');

    if (dto.employeeId) {
      const employee = await this.employees.findOne({ where: { id: dto.employeeId, isActive: true } });
      if (!employee) throw new BadRequestException('Вработениот мора да постои и да биде активен.');

      const duplicate = await this.assignments.findOne({
        where: {
          scheduleId,
          date: assignment.date,
          employeeId: dto.employeeId,
          id: Not(assignmentId),
        },
      });
      if (duplicate) {
        throw new BadRequestException('Овој вработен веќе има задача на тој датум.');
      }
      assignment.employee = employee;
      assignment.employeeId = employee.id;
    }

    if (dto.shiftTypeId) {
      const shiftType = await this.shiftTypes.findOne({ where: { id: dto.shiftTypeId } });
      if (!shiftType) throw new BadRequestException('Типот на смена мора да постои.');
      assignment.shiftType = shiftType;
      assignment.shiftTypeId = shiftType.id;
    }

    return this.assignments.save(assignment);
  }

  async export(id: number) {
    const schedule = await this.findOne(id);
    const dates = this.expandDateRange(schedule.startDate, schedule.endDate);
    const employees = await this.employees.find({
      where: { id: In([...new Set(schedule.assignments.map((assignment) => assignment.employeeId))]) },
      order: { fullName: 'ASC' },
    });

    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Распоред на смени';
    const sheet = workbook.addWorksheet('Распоред');
    sheet.addRow(['Вработен', ...dates]);
    sheet.getRow(1).font = { bold: true };

    for (const employee of employees) {
      const row = sheet.addRow([employee.fullName]);
      for (const [dateIndex, date] of dates.entries()) {
        const assignment = schedule.assignments.find((item) => item.employeeId === employee.id && item.date === date);
        const cell = row.getCell(dateIndex + 2);
        cell.value = assignment?.shiftType.name ?? '';
        if (assignment?.shiftType.color) {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: assignment.shiftType.color.replace('#', 'FF').toUpperCase() },
          };
        }
      }
    }

    sheet.columns.forEach((column) => {
      column.width = 18;
    });
    const buffer = await workbook.xlsx.writeBuffer();
    return new StreamableFile(Buffer.from(buffer));
  }

  private expandDateRange(startDate: string, endDate: string) {
    const dates: string[] = [];
    const cursor = new Date(`${startDate}T00:00:00.000Z`);
    const end = new Date(`${endDate}T00:00:00.000Z`);
    while (cursor <= end) {
      dates.push(cursor.toISOString().slice(0, 10));
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }
    return dates;
  }
}
