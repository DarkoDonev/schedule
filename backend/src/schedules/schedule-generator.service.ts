import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Employee } from '../employees/employee.entity';
import { ShiftType } from '../shift-types/shift-type.entity';
import { GenerateScheduleDto } from './dto/generate-schedule.dto';
import { Schedule } from './entities/schedule.entity';
import { ShiftAssignment } from './entities/shift-assignment.entity';

@Injectable()
export class ScheduleGeneratorService {
  private readonly maxWorkDaysPerWeek = 5;

  constructor(
    @InjectRepository(Employee) private readonly employees: Repository<Employee>,
    @InjectRepository(ShiftType) private readonly shiftTypes: Repository<ShiftType>,
  ) {}

  async buildSchedule(dto: GenerateScheduleDto): Promise<Schedule> {
    const dates = this.expandDateRange(dto.startDate, dto.endDate);
    const employees = await this.employees.find({
      where: { id: In(dto.employeeIds), isActive: true },
      order: { fullName: 'ASC' },
    });
    const shiftTypes = await this.shiftTypes.find({
      where: { id: In(dto.shiftTypeIds) },
      order: { startTime: 'ASC', name: 'ASC' },
    });

    if (employees.length !== dto.employeeIds.length) {
      throw new BadRequestException('Сите избрани вработени мора да постојат и да бидат активни.');
    }
    if (shiftTypes.length !== dto.shiftTypeIds.length) {
      throw new BadRequestException('Сите избрани типови смени мора да постојат.');
    }

    const schedule = new Schedule();
    schedule.title = dto.title;
    schedule.startDate = dto.startDate;
    schedule.endDate = dto.endDate;
    schedule.assignments = [];

    const weekKeys = [...new Set(dates.map((date) => this.weekKey(date)))];

    for (const [dayIndex, date] of dates.entries()) {
      const weekKey = this.weekKey(date);
      const weekIndex = weekKeys.indexOf(weekKey);
      const datesInWeek = dates.filter((item) => this.weekKey(item) === weekKey);
      const weekDayIndex = datesInWeek.indexOf(date);

      for (const [employeeIndex, employee] of employees.entries()) {
        if (this.isWeeklyDayOff(weekDayIndex, datesInWeek.length, employeeIndex, weekIndex)) {
          continue;
        }

        const assignment = new ShiftAssignment();
        assignment.employee = employee;
        assignment.employeeId = employee.id;
        // Rotating by day and employee index spreads shifts evenly across worked days.
        const shiftType = shiftTypes[(dayIndex + employeeIndex) % shiftTypes.length];
        assignment.shiftType = shiftType;
        assignment.shiftTypeId = shiftType.id;
        assignment.date = date;
        schedule.assignments.push(assignment);
      }
    }

    return schedule;
  }

  private isWeeklyDayOff(weekDayIndex: number, datesInWeekCount: number, employeeIndex: number, weekIndex: number): boolean {
    const daysOffNeeded = Math.max(0, datesInWeekCount - this.maxWorkDaysPerWeek);
    if (daysOffNeeded === 0) {
      return false;
    }

    const firstDayOff = (employeeIndex + weekIndex) % datesInWeekCount;
    const secondDayOff = (firstDayOff + 3) % datesInWeekCount;
    const daysOff = new Set([firstDayOff, secondDayOff]);
    return [...daysOff].slice(0, daysOffNeeded).includes(weekDayIndex);
  }

  private weekKey(value: string): string {
    const date = this.parseDate(value);
    const day = date.getUTCDay() || 7;
    date.setUTCDate(date.getUTCDate() - day + 1);
    return date.toISOString().slice(0, 10);
  }

  private expandDateRange(startDate: string, endDate: string): string[] {
    const start = this.parseDate(startDate);
    const end = this.parseDate(endDate);
    if (start > end) {
      throw new BadRequestException('Почетниот датум мора да биде пред или еднаков на крајниот датум.');
    }

    const dates: string[] = [];
    const cursor = new Date(start);
    while (cursor <= end) {
      dates.push(cursor.toISOString().slice(0, 10));
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }
    return dates;
  }

  private parseDate(value: string): Date {
    const date = new Date(`${value}T00:00:00.000Z`);
    if (Number.isNaN(date.getTime())) {
      throw new BadRequestException('Невалиден период.');
    }
    return date;
  }
}
