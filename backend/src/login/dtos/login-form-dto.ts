import { ApiProperty } from '@nestjs/swagger';

export class LoginFormDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  type = '';
}
