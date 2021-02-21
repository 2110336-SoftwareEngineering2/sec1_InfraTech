import { ApiProperty } from '@nestjs/swagger';
import { UserType } from '../enums/user-type.enum';

export class RegisterFormDto {
  @ApiProperty({ example: 'John' })
  firstname: string;
  @ApiProperty({ example: 'Doe' })
  lastname: string;
  @ApiProperty({ example: 'johndoe@gmail.com' })
  email: string;
  @ApiProperty({ example: 'secret1234' })
  password: string;
  @ApiProperty({ enum: Object.values(UserType), example: UserType.Trainer })
  userType: string;
  @ApiProperty({ example: '1111111111111' })
  cid: string;
  @ApiProperty({ example: 'MALE' })
  gender: string;
  @ApiProperty({ example: '2000-01-01' })
  birthdate: string;
  @ApiProperty({ example: '0888888888' })
  phoneNumber: string;
  @ApiProperty({ example: 'http://profileimgstore/johndoe' })
  profileImageUrl: string;
  @ApiProperty({ example: ['<uuid_of_preference1>', '<uuid_of_preference2>'] })
  preferences: string[];
}
