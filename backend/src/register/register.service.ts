import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterFormDto } from './dtos/register-form-dto';
import { UserAuth } from './user-auth.entity';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(UserAuth)
    private userAuthRepository: Repository<UserAuth>,
  ) {}
  async register(registerFormDto: RegisterFormDto): Promise<UserAuth> {
    const userAuth = this.userAuthRepository.create();

    userAuth.email = registerFormDto.email;
    userAuth.password = registerFormDto.password;
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
