import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { EmployeesModule } from './employees/employees.module';
import { ManagersModule } from './managers/managers.module';
import { SchedulesModule } from './schedules/schedules.module';
import { ShiftTypesModule } from './shift-types/shift-types.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 3306),
        username: config.get<string>('DB_USERNAME', 'schedule_user'),
        password: config.get<string>('DB_PASSWORD', 'schedule_pass'),
        database: config.get<string>('DB_DATABASE', 'shift_schedule'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    AuthModule,
    ManagersModule,
    EmployeesModule,
    ShiftTypesModule,
    SchedulesModule,
  ],
})
export class AppModule {}
