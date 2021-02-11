import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAuth } from '../entities/user-auth.entity';
import { LoginFormDto } from './dtos/login-form-dto';
import * as bcrypt from 'bcryptjs'
import { LoginTokenDto } from './dtos/login-token-dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(UserAuth)
    private userAuthRepository: Repository<UserAuth>,
  ) {}

  generateToken(email: string): LoginTokenDto {
    const LIFETIME = 1000000; // In seconds

    const token = jwt.sign({
      sub: email,
      email: email,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + LIFETIME,
    }, 'secret');

    return {
      email, token
    }
  }

  async login(loginFormDto: LoginFormDto): Promise<LoginTokenDto> {
    try {
      const userAuth = await this.userAuthRepository.findOneOrFail({
        where: {
          email: loginFormDto.email,
        }
      });

      await new Promise<void>((resolve, reject) => {
        bcrypt.compare(loginFormDto.password, userAuth.password, function(err, result) {
          // result == true
          if (err) {
            reject(err);
            return;
          }

          if (result) {
            resolve();
          } else {
            reject(new UnauthorizedException());
          }
        });
      })
  
      return this.generateToken(userAuth.email);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
