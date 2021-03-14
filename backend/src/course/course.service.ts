import { Injectable, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Connection, EntityTarget } from 'typeorm';
import { User } from '../entities/user.entity';
import { Trainer } from 'src/entities/trainer.entity';
import { Trainee } from 'src/entities/trainee.entity';
import { UserType } from 'src/register/enums/user-type.enum';
import { Preference } from '../preference/entities/preference.entity';
import { omit } from 'lodash';
import { Course } from './entities/course.entity';
import { CourseDto } from './dtos/course.dto';

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
        trainerUserId: userId,
      },
      relations: ["trainer"],
    });

    return courses;
  }

  async getCourse(id: string): Promise<Course> {
    const course = await this.courseRepository.findOneOrFail({
      where: {
        id: id,
      },
      relations: ["trainer"],
    });

    return course;
  }

  async createCourse(trainerUserId: string, dto: CourseDto): Promise<Course> {
    let course = await this.courseRepository.create({
      title: dto.title,
      description: dto.description,
      level: dto.level,
      specialization: dto.specialization,
      price: dto.price,
      period: dto.period,
      trainerUserId: trainerUserId,
      city: dto.city,
      province: dto.province,
    })

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      course = await queryRunner.manager.save(Course, course);
      await queryRunner.commitTransaction();
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();

      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('This course already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return course;
  }

  async updateCourse(id: string, courseDto: CourseDto): Promise<Course> {
    await this.courseRepository.update(id, courseDto);
    return await this.getCourse(id);
  }

  async deleteCourse(id: string): Promise<void> {
    await this.courseRepository.delete({
      id: id,
    });
  }
}
