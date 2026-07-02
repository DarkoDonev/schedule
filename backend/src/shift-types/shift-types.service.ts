import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShiftTypeDto } from './dto/create-shift-type.dto';
import { UpdateShiftTypeDto } from './dto/update-shift-type.dto';
import { ShiftType } from './shift-type.entity';

@Injectable()
export class ShiftTypesService {
  constructor(@InjectRepository(ShiftType) private readonly shiftTypes: Repository<ShiftType>) {}

  findAll() {
    return this.shiftTypes.find({ order: { startTime: 'ASC', name: 'ASC' } });
  }

  async findOne(id: number) {
    const shiftType = await this.shiftTypes.findOne({ where: { id } });
    if (!shiftType) throw new NotFoundException('Типот на смена не е пронајден.');
    return shiftType;
  }

  create(dto: CreateShiftTypeDto) {
    this.validateTimes(dto.startTime, dto.endTime);
    return this.shiftTypes.save(this.shiftTypes.create(dto));
  }

  async update(id: number, dto: UpdateShiftTypeDto) {
    const shiftType = await this.findOne(id);
    this.validateTimes(dto.startTime ?? shiftType.startTime, dto.endTime ?? shiftType.endTime);
    Object.assign(shiftType, dto);
    return this.shiftTypes.save(shiftType);
  }

  async remove(id: number) {
    const shiftType = await this.findOne(id);
    await this.shiftTypes.remove(shiftType);
    return { deleted: true };
  }

  private validateTimes(startTime: string, endTime: string) {
    if (startTime === endTime) {
      throw new BadRequestException('Почетокот и крајот на смената мора да бидат различни.');
    }
  }
}
