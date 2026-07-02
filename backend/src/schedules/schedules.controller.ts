import { Body, Controller, Delete, Get, Header, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GenerateScheduleDto } from './dto/generate-schedule.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { SchedulesService } from './schedules.service';

@UseGuards(JwtAuthGuard)
@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Get()
  findAll() {
    return this.schedulesService.findAll();
  }

  @Post('generate')
  generate(@Body() dto: GenerateScheduleDto) {
    return this.schedulesService.generate(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schedulesService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateScheduleDto) {
    return this.schedulesService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.schedulesService.remove(Number(id));
  }

  @Patch(':id/assignments/:assignmentId')
  updateAssignment(
    @Param('id') id: string,
    @Param('assignmentId') assignmentId: string,
    @Body() dto: UpdateAssignmentDto,
  ) {
    return this.schedulesService.updateAssignment(Number(id), Number(assignmentId), dto);
  }

  @Post(':id/regenerate')
  regenerate(@Param('id') id: string) {
    return this.schedulesService.regenerate(Number(id));
  }

  @Get(':id/export')
  @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  @Header('Content-Disposition', 'attachment; filename="raspored.xlsx"')
  export(@Param('id') id: string) {
    return this.schedulesService.export(Number(id));
  }
}
