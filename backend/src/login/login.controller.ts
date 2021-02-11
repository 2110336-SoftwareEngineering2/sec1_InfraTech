import { Body, Controller, Post } from '@nestjs/common';
import { UserAuth } from './user-auth.entity';
import { LoginService } from './login.service';
import { LoginFormDto } from './dtos/login-form-dto';

@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Post()
  async login(@Body() loginFormDto: LoginFormDto): Promise<UserAuth> {
    return this.loginService.login(loginFormDto);
  }
}
