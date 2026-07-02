import { IsHexColor, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateShiftTypeDto {
  @IsString()
  @MinLength(2)
  @MaxLength(80)
  name: string;

  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/)
  startTime: string;

  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/)
  endTime: string;

  @IsOptional()
  @IsHexColor()
  color?: string;
}
