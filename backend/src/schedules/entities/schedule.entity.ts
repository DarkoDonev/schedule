import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ShiftAssignment } from './shift-assignment.entity';

export enum ScheduleStatus {
  Draft = 'draft',
  Published = 'published',
}

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'date' })
  startDate: string;

  @Column({ type: 'date' })
  endDate: string;

  @Column({ type: 'enum', enum: ScheduleStatus, default: ScheduleStatus.Draft })
  status: ScheduleStatus;

  @OneToMany(() => ShiftAssignment, (assignment) => assignment.schedule, {
    cascade: true,
  })
  assignments: ShiftAssignment[];

  @CreateDateColumn()
  createdAt: Date;
}
