import { ApiProperty } from '@nestjs/swagger';

export class UpdateTraineeProfileDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  firstname: string;
  @ApiProperty()
  lastname: string;
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
