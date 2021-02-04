import { Body, Controller, Post } from '@nestjs/common';
import { RegisterFormDto } from './dtos/register-form-dto';
import { RegisterService } from './register.service';

@Controller('register')
export class RegisterController {
  constructor(private registerService: RegisterService) {}

  @Post()
  async register(@Body() registerFormDto: RegisterFormDto): Promise<void> {
    return this.registerService.register(registerFormDto);
  }
}
