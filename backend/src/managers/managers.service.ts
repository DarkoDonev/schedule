import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manager } from './manager.entity';

@Injectable()
export class ManagersService {
  constructor(@InjectRepository(Manager) private readonly managers: Repository<Manager>) {}

  findByEmail(email: string) {
    return this.managers.findOne({ where: { email } });
  }

  findById(id: number) {
    return this.managers.findOne({ where: { id } });
  }
}
