import { ArrayMinSize, ArrayUnique, IsArray, IsDateString, IsInt, IsPositive, IsString, MaxLength, MinLength } from 'class-validator';

export class GenerateScheduleDto {
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  title: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayUnique()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  employeeIds: number[];

  @IsArray()
  @ArrayMinSize(1)
  @ArrayUnique()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  shiftTypeIds: number[];
}
