import { ApiProperty } from '@nestjs/swagger';

export class UpdateTraineeProfileDto {
  @ApiProperty({ example: 'new_email@gmail.com' })
  email: string;
  @ApiProperty({ example: 'newfirstname' })
  firstname: string;
  @ApiProperty({ example: 'newlastname' })
  lastname: string;
  @ApiProperty({ example: 'FEMALE' })
  gender: string;
  @ApiProperty({ example: '2020-01-02' })
  birthdate: string;
  @ApiProperty({ example: '0888888889' })
  phoneNumber: string;
  @ApiProperty({ example: 'http://profileimgstore/newer' })
  profileImageUrl: string;
  @ApiProperty({ example: ['<uuid_of_preference3>', '<uuid_of_preference4>'] })
  preferences: string[];
}
