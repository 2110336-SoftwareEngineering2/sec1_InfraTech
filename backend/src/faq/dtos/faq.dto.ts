import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FAQDto {
  @ApiPropertyOptional()
  id?: string;

  @ApiProperty()
  question: string;

  @ApiProperty()
  answer: string;
}