import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateShiftTypeDto } from './dto/create-shift-type.dto';
import { UpdateShiftTypeDto } from './dto/update-shift-type.dto';
import { ShiftTypesService } from './shift-types.service';

@UseGuards(JwtAuthGuard)
@Controller('shift-types')
export class ShiftTypesController {
  constructor(private readonly shiftTypesService: ShiftTypesService) {}

  @Get()
  findAll() {
    return this.shiftTypesService.findAll();
  }

  @Post()
  create(@Body() dto: CreateShiftTypeDto) {
    return this.shiftTypesService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shiftTypesService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateShiftTypeDto) {
    return this.shiftTypesService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shiftTypesService.remove(Number(id));
  }
}
