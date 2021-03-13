import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { Trainee } from '../entities/trainee.entity';
import { Builder } from 'builder-pattern';
import { RegisterFormDto } from '../register/dtos/register-form-dto';
import { UserService } from '../user/user.service';

interface RegistrationInfo {
  user: User;
  registerFormDto: RegisterFormDto;
}

@Injectable()
export class TraineeService {
  constructor(
    @InjectRepository(Trainee)
    private traineeRepository: Repository<Trainee>,
  ) {}

  async createWithRegistrationInfo({
    user,
    registerFormDto,
  }: RegistrationInfo): Promise<Trainee> {
    const trainee = Builder(Trainee)
      .user(user)
      .firstname(registerFormDto.firstname)
      .lastname(registerFormDto.lastname)
      .gender(registerFormDto.gender)
      .birthdate(registerFormDto.birthdate)
      .phoneNumber(registerFormDto.phoneNumber)
      .profileImageUrl(registerFormDto.profileImageUrl)
      .build();

    return trainee;
  }
}
