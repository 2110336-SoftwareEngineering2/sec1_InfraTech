import { Body, Controller, Post } from '@nestjs/common';
import { RegisterFormDto } from './dtos/register-form-dto';
import { RegisterService } from './register.service';
import { User } from '../entities/user.entity';

@Controller('register')
export class RegisterController {
  constructor(private registerService: RegisterService) {}

  @Post()
  async register(@Body() registerFormDto: RegisterFormDto): Promise<User> {
    return this.registerService.register(registerFormDto);
  }
}
