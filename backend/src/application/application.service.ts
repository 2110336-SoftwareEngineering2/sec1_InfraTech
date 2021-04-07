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
  courseId?: string;
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
  }: TraineeApplicationsFilter): Promise<Application[]> {
    return await this.applicationRepository
      .createQueryBuilder('application')
      .where('application.trainee_user_id=:traineeId', { traineeId: traineeId })
      .leftJoinAndSelect('application.course', 'course')
      .leftJoinAndSelect('course.trainer', 'trainer')
      .getMany();
  }

  async getTrainerApplications({
    trainerId,
  }: TrainerApplicationFilter): Promise<Application[]> {
    return await this.applicationRepository
      .createQueryBuilder('application')
      .leftJoinAndSelect(
        'application.course',
        'course',
        'course.trainer_user_id=:trainerId',
        { trainerId: trainerId },
      )
      .leftJoinAndSelect('application.trainee', 'trainee')
      .getMany();
  }

  async getTrainerApplicationsByCourseId({
    trainerId,
    courseId,
  }: TrainerApplicationFilter): Promise<Application[]> {
    return await this.applicationRepository
      .createQueryBuilder('application')
      .leftJoin('application.course', 'course', 'course.id=:courseId', {
        courseId: courseId,
      })
      .where('course.trainer_user_id=:trainerId', { trainerId: trainerId })
      .leftJoinAndSelect('application.trainee', 'trainee')
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
        relations: ['course', 'course.trainer'],
      });
    } catch (e) {
      throw new HttpException('application not found', HttpStatus.NOT_FOUND);
    }
  }

  async getApprovedApplication({
    traineeId,
    courseId,
  }: TraineeApplication): Promise<Application> {
    try {
      return await this.applicationRepository.findOneOrFail({
        where: [
          {
            traineeUserId: traineeId,
            courseId: courseId,
            status: ApplicationStatus.APPROVED,
          },
        ],
        relations: ['course', 'course.trainer'],
      });
    } catch (e) {
      throw new HttpException('application not found', HttpStatus.NOT_FOUND);
    }
  }

  async save(application: Application) {
    await this.applicationRepository.save(application);
  }

  async remove(application: Application) {
    if (application.status !== ApplicationStatus.CANCELED) {
      return;
    }
    await this.applicationRepository.remove(application);
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
