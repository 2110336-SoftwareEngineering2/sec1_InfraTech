import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { LoginFormDto } from './dtos/login-form-dto';
import * as bcrypt from 'bcryptjs'
import { LoginTokenDto } from './dtos/login-token-dto';
import * as jwt from 'jsonwebtoken';
import { Trainer } from 'src/entities/trainer.entity';
import { Trainee } from 'src/entities/trainee.entity';
import { UserType } from 'src/register/enums/user-type.enum';
import * as config from 'config';

const authConfig = config.get('auth');

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Trainee)
    private traineeRepository: Repository<Trainee>,

    @InjectRepository(Trainer)
    private trainerRepository: Repository<Trainer>,
  ) {}

  generateToken(id: string, email: string, type: string): LoginTokenDto {
    const LIFETIME = 1000000; // In seconds

    const token = jwt.sign({
      sub: id,
      email: email,
      type: type,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + LIFETIME,
    }, authConfig.jwtSecret);

    return {
      email, token
    }
  }

  async login(loginFormDto: LoginFormDto): Promise<LoginTokenDto> {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: {
          email: loginFormDto.email,
        }
      });

      await new Promise<void>((resolve, reject) => {
        bcrypt.compare(loginFormDto.password, user.password, function(err, result) {
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

      let type = loginFormDto.type;

      if (!type) {
        let traineeProfile = await this.traineeRepository.findOne({
          where: {
            userId: user.id
          }
        });

        type = traineeProfile ? UserType.Trainee : UserType.Trainer;
      }
  
      return this.generateToken(user.id, user.email, type);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
