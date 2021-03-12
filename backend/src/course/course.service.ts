import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Connection, EntityTarget } from 'typeorm';
import { User } from '../entities/user.entity';
import { Trainer } from 'src/entities/trainer.entity';
import { Trainee } from 'src/entities/trainee.entity';
import { UserType } from 'src/register/enums/user-type.enum';
import { Preference } from '../preference/entities/preference.entity';
import { omit } from 'lodash';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    private connection: Connection,
  ) {}

  async listCourses(userId: string): Promise<Course[]> {
    const courses = await this.courseRepository.find({
      where: {
        trainer: {
          user: {
            id: userId
          }
        }
      },
      relations: ["trainer", "trainer.user", "trainee"]
    });

    return courses;
  }

  async getCourse(id: string): Promise<Course> {
    const course = await this.courseRepository.findOneOrFail({
      where: {
        id: id,
      },
      relations: ["trainer", "trainer.user", "trainee"]
    });

    return course;
  }

  async createCourse(id: string): Promise<Course> {
    const course = await this.courseRepository.findOneOrFail({
      where: {
        id: id,
      },
      relations: ["trainer", "trainer.user", "trainee"]
    });

    return course;
  }

  async deleteCourse(id: string): Promise<void> {
    await this.courseRepository.delete({
      id: id,
    });
  }
}
