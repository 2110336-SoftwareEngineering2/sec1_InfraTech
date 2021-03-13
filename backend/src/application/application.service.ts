import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Trainee } from '../entities/trainee.entity';
import { Builder } from 'builder-pattern';
import {
  Application,
  ApplicationStatus,
} from '../application/entities/application.entity';
import { Course } from '../course/entities/course.entity';

interface TraineeApplication {
  courseId: string;
  traineeId: string;
}

type TraineeCancellation = TraineeApplication;

interface TrainerApprove {
  courseId: string;
  traineeId: string;
  trainerId: string;
}

type TrainerReject = TrainerApprove;

interface Validation {
  trainerId: string;
  application: Application;
}

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {}

  async createWithApplicationInfoAndSave({
    courseId,
    traineeId,
  }: TraineeApplication): Promise<void> {
    const application = Builder(Application)
      .status(ApplicationStatus.PENDING)
      .course(Builder(Course).id(courseId).build())
      .trainee(Builder(Trainee).userId(traineeId).build())
      .build();
    await this.applicationRepository.save(application);
  }

  async getPendingApplication({
    traineeId,
    courseId,
  }: TraineeApplication): Promise<Application> {
    try {
      return await this.applicationRepository.findOneOrFail({
        where: [
          {
            traineeUserId: traineeId,
            courseId: courseId,
            status: ApplicationStatus.PENDING,
          },
        ],
        relations: ['course'],
      });
    } catch (e) {
      throw new HttpException('application not found', HttpStatus.NOT_FOUND);
    }
  }

  async cancelByTrainee({
    courseId,
    traineeId,
  }: TraineeCancellation): Promise<void> {
    const application = await this.getPendingApplication({
      courseId,
      traineeId,
    });

    application.status = ApplicationStatus.APPROVED;
    await this.applicationRepository.save(application);
  }

  async validateTrainer({ trainerId, application }: Validation): Promise<void> {
    if (application.course.trainerUserId !== trainerId) {
      throw new HttpException(
        'application does not belong to the trainer',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async approveByTrainer({
    courseId,
    traineeId,
    trainerId,
  }: TrainerApprove): Promise<void> {
    const application = await this.getPendingApplication({
      traineeId,
      courseId,
    });
    await this.validateTrainer({ trainerId, application });

    application.status = ApplicationStatus.APPROVED;
    await this.applicationRepository.save(application);
  }

  async rejectByTrainer({
    courseId,
    traineeId,
    trainerId,
  }: TrainerReject): Promise<void> {
    const application = await this.getPendingApplication({
      traineeId,
      courseId,
    });
    await this.validateTrainer({ trainerId, application });

    application.status = ApplicationStatus.REJECTED;
    await this.applicationRepository.save(application);
  }
}
