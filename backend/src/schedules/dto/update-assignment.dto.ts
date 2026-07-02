import { IsInt, IsOptional } from 'class-validator';

export class UpdateAssignmentDto {
  @IsOptional()
  @IsInt()
  employeeId?: number;

  @IsOptional()
  @IsInt()
  shiftTypeId?: number;
}
