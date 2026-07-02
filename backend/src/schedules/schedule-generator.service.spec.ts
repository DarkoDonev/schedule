import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Employee } from '../employees/employee.entity';
import { ShiftType } from '../shift-types/shift-type.entity';
import { ScheduleGeneratorService } from './schedule-generator.service';

describe('ScheduleGeneratorService', () => {
  const employees = [
    { id: 1, fullName: 'Ada Lovelace', isActive: true },
    { id: 2, fullName: 'Grace Hopper', isActive: true },
  ];
  const shiftTypes = [
    { id: 1, name: 'Morning', startTime: '08:00' },
    { id: 2, name: 'Night', startTime: '20:00' },
  ];

  async function createService() {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ScheduleGeneratorService,
        {
          provide: getRepositoryToken(Employee),
          useValue: { find: jest.fn().mockResolvedValue(employees) },
        },
        {
          provide: getRepositoryToken(ShiftType),
          useValue: { find: jest.fn().mockResolvedValue(shiftTypes) },
        },
      ],
    }).compile();

    return moduleRef.get(ScheduleGeneratorService);
  }

  it('assigns every employee once per date for short ranges with rotating shifts', async () => {
    const service = await createService();
    const schedule = await service.buildSchedule({
      title: 'Week',
      startDate: '2026-07-01',
      endDate: '2026-07-02',
      employeeIds: [1, 2],
      shiftTypeIds: [1, 2],
    });

    expect(schedule.assignments).toHaveLength(4);
    expect(schedule.assignments.map((item) => `${item.date}:${item.employeeId}`)).toEqual([
      '2026-07-01:1',
      '2026-07-01:2',
      '2026-07-02:1',
      '2026-07-02:2',
    ]);
    expect(schedule.assignments.map((item) => item.shiftTypeId)).toEqual([1, 2, 2, 1]);
  });

  it('gives every employee two free days in a full week', async () => {
    const service = await createService();
    const schedule = await service.buildSchedule({
      title: 'Week',
      startDate: '2026-07-06',
      endDate: '2026-07-12',
      employeeIds: [1, 2],
      shiftTypeIds: [1, 2],
    });

    for (const employee of employees) {
      const assignments = schedule.assignments.filter((item) => item.employeeId === employee.id);
      const uniqueDates = new Set(assignments.map((item) => item.date));
      expect(assignments).toHaveLength(5);
      expect(uniqueDates.size).toBe(5);
    }
  });

  it('rejects inverted date ranges', async () => {
    const service = await createService();
    await expect(
      service.buildSchedule({
        title: 'Bad',
        startDate: '2026-07-03',
        endDate: '2026-07-02',
        employeeIds: [1],
        shiftTypeIds: [1],
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
