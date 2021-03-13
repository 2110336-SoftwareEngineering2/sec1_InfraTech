import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { Trainee } from '../entities/trainee.entity';
import { Builder } from 'builder-pattern';
import { RegisterFormDto } from '../register/dtos/register-form-dto';

@Injectable()
export class TraineeService {
  constructor(
    @InjectRepository(Trainee)
    private traineeRepository: Repository<Trainee>,
  ) {}

  async createWithRegistrationInfo(
    user: User,
    registrationInfo: RegisterFormDto,
  ): Promise<Trainee> {
    const traineeBuilder = Builder(Trainee)
      .user(user)
      .firstname(registrationInfo.firstname)
      .lastname(registrationInfo.lastname)
      .gender(registrationInfo.gender)
      .birthdate(registrationInfo.birthdate)
      .phoneNumber(registrationInfo.phoneNumber)
      .profileImageUrl(registrationInfo.profileImageUrl);
    
    return traineeBuilder.build();
  }
}
