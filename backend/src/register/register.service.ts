import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterFormDto } from './dtos/register-form-dto';
import { UserAuth } from '../entities/user-auth.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(UserAuth)
    private userAuthRepository: Repository<UserAuth>,
  ) {}
  async register(registerFormDto: RegisterFormDto): Promise<UserAuth> {
    const userAuth = this.userAuthRepository.create();
    const saltRounds = 10;

    await new Promise<void>((resolve, reject) => {
      bcrypt.genSalt(saltRounds, function(err, salt) {
        if (err) {
          reject(err);
          return;
        }

        bcrypt.hash(registerFormDto.password, salt, function(err, hash) {
          // Store hash in your password DB.
          if (err) {
            reject(err);
            return;
          }

          userAuth.password = hash;
          userAuth.salt = salt;
          resolve();
        });
      });
    })

    userAuth.email = registerFormDto.email;

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
