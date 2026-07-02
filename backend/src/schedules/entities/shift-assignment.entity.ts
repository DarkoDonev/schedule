import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Employee } from '../../employees/employee.entity';
import { ShiftType } from '../../shift-types/shift-type.entity';
import { Schedule } from './schedule.entity';

@Entity()
@Unique(['scheduleId', 'employeeId', 'date'])
export class ShiftAssignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  scheduleId: number;

  @ManyToOne(() => Schedule, (schedule) => schedule.assignments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'scheduleId' })
  schedule: Schedule;

  @Column()
  employeeId: number;

  @ManyToOne(() => Employee, { eager: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'employeeId' })
  employee: Employee;

  @Column()
  shiftTypeId: number;

  @ManyToOne(() => ShiftType, { eager: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'shiftTypeId' })
  shiftType: ShiftType;

  @Column({ type: 'date' })
  date: string;

  @CreateDateColumn()
  createdAt: Date;
}
