import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { Trainee } from '../entities/trainee.entity';
import { Builder } from 'builder-pattern';
import { RegisterFormDto } from '../register/dtos/register-form-dto';
import { Application } from '../application/entities/application.entity';
import { Course } from '../course/entities/course.entity';

interface RegistrationInfo {
  user: User;
  registerFormDto: RegisterFormDto;
}

interface ApplicationInfo {
  courseId: string;
  userId: string;
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

  async getTraineeInformation(userId: string): Promise<Trainee> {
    return await this.traineeRepository
      .createQueryBuilder('trainee')
      .leftJoinAndSelect('trainee.applications', 'application')
      .where('trainee.user_id=:id', { id: userId })
      .leftJoinAndSelect('application.course', 'course')
      .getOneOrFail();
  }
}
