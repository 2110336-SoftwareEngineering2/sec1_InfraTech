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
import { TrainerProfile } from 'src/entities/trainer-profile.entity';
import { TraineeProfile } from 'src/entities/trainee-profile.entity';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(TraineeProfile)
    private traineeProfileRepository: Repository<TraineeProfile>,

    @InjectRepository(TrainerProfile)
    private trainerProfileRepository: Repository<TrainerProfile>,
  ) {}

  generateToken(email: string, type: string): LoginTokenDto {
    const LIFETIME = 1000000; // In seconds

    const token = jwt.sign({
      sub: email,
      email: email,
      type: type,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + LIFETIME,
    }, 'secret');

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
        let traineeProfile = await this.traineeProfileRepository.findOne({
          where: {
            userId: user.id
          }
        });

        type = traineeProfile ? "trainee" : "trainer";
      }
  
      return this.generateToken(user.email, type);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
