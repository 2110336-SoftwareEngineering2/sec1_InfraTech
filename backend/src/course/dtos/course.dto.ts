import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CourseDto {
  @ApiPropertyOptional()
  id?: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  level: string;

  @ApiProperty()
  specialization: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  period: number;

  @ApiProperty()
  district: string;

  @ApiProperty()
  province: string;
}
