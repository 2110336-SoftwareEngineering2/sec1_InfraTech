import { Injectable } from '@nestjs/common';
import { RegisterFormDto } from './dtos/register-form-dto';

@Injectable()
export class RegisterService {
  async register(registerFormDto: RegisterFormDto): Promise<void> {
    console.log(registerFormDto);
    return Promise.resolve();
  }
}
