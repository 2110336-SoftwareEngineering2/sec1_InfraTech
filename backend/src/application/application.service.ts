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

interface TraineeApplicationsFilter {
  traineeId: string;
  // status may be used in the future
  status?: ApplicationStatus;
}

interface TrainerApplicationFilter {
  trainerId: string;
  // status may be used in the future
  status?: ApplicationStatus;
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

  async getTraineeApplications({
    traineeId,
    status,
  }: TraineeApplicationsFilter): Promise<Application[]> {
    return await this.applicationRepository.find({
      where: [{ traineeUserId: traineeId }],
      relations: ['course'],
    });
  }

  async getTrainerApplications({
    trainerId,
    status,
  }: TrainerApplicationFilter): Promise<Application[]> {
    return await this.applicationRepository
      .createQueryBuilder('application')
      .leftJoinAndSelect('application.course', 'course')
      .where('course.trainer_user_id=:trainerId', { trainerId: trainerId })
      .getMany();
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

  async save(application: Application) {
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
}
