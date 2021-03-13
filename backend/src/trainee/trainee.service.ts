import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { Trainee } from '../entities/trainee.entity';
import { Builder } from 'builder-pattern';
import { RegisterFormDto } from '../register/dtos/register-form-dto';
import { Course } from '../course/entities/course.entity';
import { Application } from '../application/entities/application.entity';

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

  async applyCourse({ courseId, userId }: ApplicationInfo): Promise<Trainee> {
    const trainee = await this.traineeRepository.findOneOrFail({
      where: [{ user: { id: userId } }],
      relations: ['user', 'applications'],
    });

    const application = Builder(Application)
      .courseId(courseId)
      .traineeUserId(userId)
      .build();

    trainee.applications.push(application);

    await this.traineeRepository.save(trainee);

    return trainee;
  }
}
