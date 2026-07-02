import 'reflect-metadata';
import { config } from 'dotenv';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { Employee } from '../employees/employee.entity';
import { Manager } from '../managers/manager.entity';
import { Schedule } from '../schedules/entities/schedule.entity';
import { ShiftAssignment } from '../schedules/entities/shift-assignment.entity';
import { ShiftType } from '../shift-types/shift-type.entity';

config();

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 3306),
  username: process.env.DB_USERNAME ?? 'schedule_user',
  password: process.env.DB_PASSWORD ?? 'schedule_pass',
  database: process.env.DB_DATABASE ?? 'shift_schedule',
  entities: [Manager, Employee, ShiftType, Schedule, ShiftAssignment],
  synchronize: true,
});

async function seed() {
  await dataSource.initialize();
  const managers = dataSource.getRepository(Manager);
  const employees = dataSource.getRepository(Employee);
  const shiftTypes = dataSource.getRepository(ShiftType);
  const email = process.env.SEED_MANAGER_EMAIL ?? 'manager@example.com';
  const existing = await managers.findOne({ where: { email } });

  if (!existing) {
    const password = process.env.SEED_MANAGER_PASSWORD ?? 'ChangeMe123!';
    await managers.save(
      managers.create({
        name: process.env.SEED_MANAGER_NAME ?? 'Главен менаџер',
        email,
        passwordHash: await bcrypt.hash(password, 12),
      }),
    );
    console.log(`Креиран е менаџер ${email}`);
  } else {
    console.log(`Менаџерот ${email} веќе постои`);
  }

  const exampleEmployees = [
    { fullName: 'Александар Стојановски', email: 'aleksandar.stojanovski@example.com', phone: '+38970111222', position: 'Оператор' },
    { fullName: 'Марија Петровска', email: 'marija.petrovska@example.com', phone: '+38970222333', position: 'Супервизор' },
    { fullName: 'Ивана Николовска', email: 'ivana.nikolovska@example.com', phone: '+38970333444', position: 'Администрација' },
    { fullName: 'Бојан Трајковски', email: 'bojan.trajkovski@example.com', phone: '+38970444555', position: 'Оператор' },
    { fullName: 'Елена Георгиевска', email: 'elena.georgievska@example.com', phone: '+38970555666', position: 'Поддршка' },
    { fullName: 'Филип Јовановски', email: 'filip.jovanovski@example.com', phone: '+38970666777', position: 'Оператор' },
    { fullName: 'Сара Ангеловска', email: 'sara.angelovska@example.com', phone: '+38970777888', position: 'Поддршка' },
  ];

  for (const employee of exampleEmployees) {
    const exists = await employees.findOne({ where: { email: employee.email } });
    if (!exists) {
      await employees.save(employees.create({ ...employee, isActive: true }));
    }
  }
  console.log('Креирани се пример вработени со македонски имиња');

  const exampleShiftTypes = [
    { name: 'Утринска', startTime: '06:00', endTime: '14:00', color: '#2563eb' },
    { name: 'Попладневна', startTime: '14:00', endTime: '22:00', color: '#f97316' },
    { name: 'Ноќна', startTime: '22:00', endTime: '06:00', color: '#7c3aed' },
  ];

  for (const shiftType of exampleShiftTypes) {
    const exists = await shiftTypes.findOne({ where: { name: shiftType.name } });
    if (!exists) {
      await shiftTypes.save(shiftTypes.create(shiftType));
    }
  }
  console.log('Креирани се македонски типови смени');

  await dataSource.destroy();
}

seed().catch(async (error) => {
  console.error(error);
  if (dataSource.isInitialized) await dataSource.destroy();
  process.exit(1);
});
