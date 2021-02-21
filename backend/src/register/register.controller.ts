import { Body, Controller, Post } from '@nestjs/common';
import { RegisterFormDto } from './dtos/register-form-dto';
import { RegisterService } from './register.service';
import { User } from '../entities/user.entity';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('register')
export class RegisterController {
  constructor(private registerService: RegisterService) {}

  @Post()
  @ApiCreatedResponse({
    description:
      'The record of user, trainer or trainee and user_preference has been successfully created.',
  })
  @ApiConflictResponse({
    description: 'The email already exists.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  async register(@Body() registerFormDto: RegisterFormDto): Promise<User> {
    return this.registerService.register(registerFormDto);
  }
}
