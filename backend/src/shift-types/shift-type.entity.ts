import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

const timeTransformer = {
  to: (value?: string) => value,
  from: (value?: string) => value?.slice(0, 5),
};

@Entity()
export class ShiftType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'time', transformer: timeTransformer })
  startTime: string;

  @Column({ type: 'time', transformer: timeTransformer })
  endTime: string;

  @Column({ nullable: true })
  color?: string;

  @CreateDateColumn()
  createdAt: Date;
}
