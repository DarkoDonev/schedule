import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShiftType } from './shift-type.entity';
import { ShiftTypesController } from './shift-types.controller';
import { ShiftTypesService } from './shift-types.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShiftType])],
  controllers: [ShiftTypesController],
  providers: [ShiftTypesService],
})
export class ShiftTypesModule {}
