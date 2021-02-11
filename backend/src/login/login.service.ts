import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAuth } from './user-auth.entity';
import { LoginFormDto } from './dtos/login-form-dto';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(UserAuth)
    private userAuthRepository: Repository<UserAuth>,
  ) {}
  async login(loginFormDto: LoginFormDto): Promise<UserAuth> {
    const userAuth = this.userAuthRepository.create();

    userAuth.email = loginFormDto.email;
    userAuth.password = loginFormDto.password;
    userAuth.salt = 'generated salt';

    try {
      await this.userAuthRepository.insert(userAuth);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('This email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return userAuth;
  }
}
