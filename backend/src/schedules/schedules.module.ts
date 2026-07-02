import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../employees/employee.entity';
import { ShiftType } from '../shift-types/shift-type.entity';
import { Schedule } from './entities/schedule.entity';
import { ShiftAssignment } from './entities/shift-assignment.entity';
import { ScheduleGeneratorService } from './schedule-generator.service';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, ShiftAssignment, Employee, ShiftType])],
  controllers: [SchedulesController],
  providers: [SchedulesService, ScheduleGeneratorService],
})
export class SchedulesModule {}
