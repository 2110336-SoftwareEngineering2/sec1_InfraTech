import { Body, Controller, Post } from '@nestjs/common';
import { RegisterFormDto } from './dtos/register-form-dto';
import { RegisterService } from './register.service';
import { RegisterResultDto } from './dtos/register-result-dto';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Register')
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
  async register(
    @Body() registerFormDto: RegisterFormDto,
  ): Promise<RegisterResultDto> {
    return this.registerService.register(registerFormDto);
  }
}
