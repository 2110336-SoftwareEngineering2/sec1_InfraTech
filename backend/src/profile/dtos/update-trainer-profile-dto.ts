import { ApiProperty } from '@nestjs/swagger';

export class UpdateTrainerProfileDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  firstname: string;
  @ApiProperty()
  lastname: string;
  @ApiProperty()
  cid: string;
  @ApiProperty()
  gender: string;
  @ApiProperty()
  birthdate: string;
  @ApiProperty()
  phoneNumber: string;
  @ApiProperty()
  profileImageUrl: string;
  @ApiProperty()
  preferences: string[];
}
