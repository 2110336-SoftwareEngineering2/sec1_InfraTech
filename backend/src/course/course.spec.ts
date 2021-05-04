import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterModule } from 'src/register/register.module';
import { LoginModule } from 'src/login/login.module';
import { ProfileModule } from 'src/profile/profile.module';
import { PreferenceModule } from 'src/preference/preference.module';
import { TrainerModule } from 'src/trainer/trainer.module';
import { CourseModule } from 'src/course/course.module';
import { ApplicationModule } from 'src/application/application.module';
import { FAQModule } from 'src/faq/faq.module';
import { ReviewModule } from 'src/review/review.module';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';

import config from '../../config/development';
import { CourseService } from 'src/course/course.service';
import { CourseDto } from './dtos/course.dto';

const dbConfig = config.db;

describe('Course Module', () => {
  let app: INestApplication;
  let courseService: CourseService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          // TODO: use configs
          type: 'mysql',
          host: '127.0.0.1',
          port: 3307,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.database,
          entities: ['src/**/*.entity{.ts,.js}'],
          synchronize: false,
        }),
        RegisterModule,
        LoginModule,
        ProfileModule,
        PreferenceModule,
        TrainerModule,
        CourseModule,
        ApplicationModule,
        FAQModule,
        ReviewModule,
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    courseService = moduleFixture.get<CourseService>(CourseService);
  });

  it('listCourses', async () => {
    const result = JSON.parse(JSON.stringify(await courseService.listCourses('user-id-1')));

    // console.log(result)

    expect(result).toEqual([
      {
        id: 'course-id-1',
        title: 'Course Title 1',
        description: 'description',
        level: 'intermediate',
        specialization: 'strength',
        price: '100000.00',
        period: 200,
        district: 'Sam Yan',
        province: 'Bangkok',
        trainerUserId: 'user-id-1',
        trainer: {
          userId: 'user-id-1',
          firstname: 'Wongtawan',
          lastname: 'Junthai',
          cid: '1111111111',
          gender: 'MALE',
          birthdate: '1999-12-31T17:00:00.000Z',
          phoneNumber: '0882441120',
          profileImageUrl: 'https://www.google.com',
          averageRating: '3.25',
          numberOfRegisteredTrainees: 0
        }
      },
      {
        id: 'course-id-2',
        title: 'Course Title 2',
        description: 'description',
        level: 'intermediate',
        specialization: 'strength',
        price: '100000.00',
        period: 200,
        district: 'Sam Yan',
        province: 'Bangkok',
        trainerUserId: 'user-id-1',
        trainer: {
          userId: 'user-id-1',
          firstname: 'Wongtawan',
          lastname: 'Junthai',
          cid: '1111111111',
          gender: 'MALE',
          birthdate: '1999-12-31T17:00:00.000Z',
          phoneNumber: '0882441120',
          profileImageUrl: 'https://www.google.com',
          averageRating: '3.25',
          numberOfRegisteredTrainees: 0
        }
      },
      {
        id: 'course-id-3',
        title: 'Course Title 3',
        description: 'description',
        level: 'intermediate',
        specialization: 'strength',
        price: '100000.00',
        period: 200,
        district: 'Sam Yan',
        province: 'Bangkok',
        trainerUserId: 'user-id-1',
        trainer: {
          userId: 'user-id-1',
          firstname: 'Wongtawan',
          lastname: 'Junthai',
          cid: '1111111111',
          gender: 'MALE',
          birthdate: '1999-12-31T17:00:00.000Z',
          phoneNumber: '0882441120',
          profileImageUrl: 'https://www.google.com',
          averageRating: '3.25',
          numberOfRegisteredTrainees: 0
        }
      },
      {
        id: 'course-id-4',
        title: 'Course Title 4',
        description: 'description',
        level: 'intermediate',
        specialization: 'strength',
        price: '100000.00',
        period: 200,
        district: 'Sam Yan',
        province: 'Bangkok',
        trainerUserId: 'user-id-1',
        trainer: {
          userId: 'user-id-1',
          firstname: 'Wongtawan',
          lastname: 'Junthai',
          cid: '1111111111',
          gender: 'MALE',
          birthdate: '1999-12-31T17:00:00.000Z',
          phoneNumber: '0882441120',
          profileImageUrl: 'https://www.google.com',
          averageRating: '3.25',
          numberOfRegisteredTrainees: 0
        }
      },
      {
        id: 'course-id-5',
        title: 'Course Title 5',
        description: 'description',
        level: 'intermediate',
        specialization: 'strength',
        price: '100000.00',
        period: 200,
        district: 'Sam Yan',
        province: 'Bangkok',
        trainerUserId: 'user-id-1',
        trainer: {
          userId: 'user-id-1',
          firstname: 'Wongtawan',
          lastname: 'Junthai',
          cid: '1111111111',
          gender: 'MALE',
          birthdate: '1999-12-31T17:00:00.000Z',
          phoneNumber: '0882441120',
          profileImageUrl: 'https://www.google.com',
          averageRating: '3.25',
          numberOfRegisteredTrainees: 0
        }
      },
      {
        id: 'course-id-6',
        title: 'Course Title 6',
        description: 'description',
        level: 'intermediate',
        specialization: 'strength',
        price: '100000.00',
        period: 200,
        district: 'Sam Yan',
        province: 'Bangkok',
        trainerUserId: 'user-id-1',
        trainer: {
          userId: 'user-id-1',
          firstname: 'Wongtawan',
          lastname: 'Junthai',
          cid: '1111111111',
          gender: 'MALE',
          birthdate: '1999-12-31T17:00:00.000Z',
          phoneNumber: '0882441120',
          profileImageUrl: 'https://www.google.com',
          averageRating: '3.25',
          numberOfRegisteredTrainees: 0
        }
      },
      {
        id: 'course-id-7',
        title: 'Course Title 7',
        description: 'description',
        level: 'intermediate',
        specialization: 'strength',
        price: '100000.00',
        period: 200,
        district: 'Sam Yan',
        province: 'Bangkok',
        trainerUserId: 'user-id-1',
        trainer: {
          userId: 'user-id-1',
          firstname: 'Wongtawan',
          lastname: 'Junthai',
          cid: '1111111111',
          gender: 'MALE',
          birthdate: '1999-12-31T17:00:00.000Z',
          phoneNumber: '0882441120',
          profileImageUrl: 'https://www.google.com',
          averageRating: '3.25',
          numberOfRegisteredTrainees: 0
        }
      },
      {
        id: 'course-id-8',
        title: 'Course Title 8',
        description: 'description',
        level: 'intermediate',
        specialization: 'strength',
        price: '100000.00',
        period: 200,
        district: 'Sam Yan',
        province: 'Bangkok',
        trainerUserId: 'user-id-1',
        trainer: {
          userId: 'user-id-1',
          firstname: 'Wongtawan',
          lastname: 'Junthai',
          cid: '1111111111',
          gender: 'MALE',
          birthdate: '1999-12-31T17:00:00.000Z',
          phoneNumber: '0882441120',
          profileImageUrl: 'https://www.google.com',
          averageRating: '3.25',
          numberOfRegisteredTrainees: 0
        }
      },
      {
        id: 'course-id-9',
        title: 'Course Title 9',
        description: 'description',
        level: 'intermediate',
        specialization: 'strength',
        price: '100000.00',
        period: 200,
        district: 'Sam Yan',
        province: 'Bangkok',
        trainerUserId: 'user-id-1',
        trainer: {
          userId: 'user-id-1',
          firstname: 'Wongtawan',
          lastname: 'Junthai',
          cid: '1111111111',
          gender: 'MALE',
          birthdate: '1999-12-31T17:00:00.000Z',
          phoneNumber: '0882441120',
          profileImageUrl: 'https://www.google.com',
          averageRating: '3.25',
          numberOfRegisteredTrainees: 0
        }
      }
    ]);
  });

  it('getCourse', async () => {
    const result = JSON.parse(JSON.stringify(await courseService.getCourse('course-id-0')));
    expect(result)
      .toEqual({
        description: 'Up size you biceps and prepare to go beyond human limits',
        district: 'Sam Yan',
        id: 'course-id-0',
        level: 'beginner',
        period: 20,
        price: '1999.00',
        province: 'Bangkok',
        specialization: 'strength',
        title: 'Biceps Burst',
        trainer: {
          averageRating: '0.00',
          birthdate: '2017-06-14T17:00:00.000Z',
          cid: '0',
          firstname: 'Somlux',
          gender: 'MALE',
          lastname: 'Kamsing',
          numberOfRegisteredTrainees: 0,
          phoneNumber: '081234567',
          profileImageUrl:
            'https://www.aceshowbiz.com/images/photo/john_cena.jpg',
          userId: 'user-id-2',
        },
        trainerUserId: 'user-id-2',
      });
  });

  it('create course', async () => {
    const course: CourseDto = {
      description: 'Up size you biceps and prepare to go beyond human limits of your body',
      district: 'Nong Kheam',
      level: 'beginner',
      period: 20,
      price: 1999.00,
      province: 'Bangkok',
      specialization: 'strength',
      title: 'Biceps Burst and Burn',
    }

    let createResult = JSON.parse(JSON.stringify(await courseService.createCourse('user-id-2', course)));

    let baselineAfterCreate: any = {
      description: 'Up size you biceps and prepare to go beyond human limits of your body',
      district: 'Nong Kheam',
      level: 'beginner',
      id: createResult.id,
      period: 20,
      price: 1999,
      province: 'Bangkok',
      specialization: 'strength',
      title: 'Biceps Burst and Burn',
      trainerUserId: 'user-id-2',
    }

    expect(createResult).toEqual(baselineAfterCreate);

    const getResult = JSON.parse(JSON.stringify(await courseService.getCourse(createResult.id)));

    baselineAfterCreate.trainer = {
      averageRating: '0.00',
      birthdate: '2017-06-14T17:00:00.000Z',
      cid: '0',
      firstname: 'Somlux',
      gender: 'MALE',
      lastname: 'Kamsing',
      numberOfRegisteredTrainees: 0,
      phoneNumber: '081234567',
      profileImageUrl:
        'https://www.aceshowbiz.com/images/photo/john_cena.jpg',
      userId: 'user-id-2',
    };
    baselineAfterCreate.price = '1999.00';

    expect(getResult).toEqual(baselineAfterCreate);
  });

  it('update course', async () => {
    const course: CourseDto = {
      description: 'Up size you biceps and prepare to go beyond human limits of your body',
      district: 'Nong Kheam',
      level: 'beginner',
      period: 20,
      price: 1999.00,
      province: 'Bangkok',
      specialization: 'strength',
      title: 'Biceps Burst and Burn',
    }

    let createResult = JSON.parse(JSON.stringify(await courseService.createCourse('user-id-2', course)));

    let baselineAfterCreate: any = {
      description: 'Up size you biceps and prepare to go beyond human limits of your body',
      district: 'Nong Kheam',
      level: 'beginner',
      id: createResult.id,
      period: 20,
      price: 1999,
      province: 'Bangkok',
      specialization: 'strength',
      title: 'Biceps Burst and Burn',
      trainerUserId: 'user-id-2',
    }

    expect(createResult).toEqual(baselineAfterCreate);

    const getResult = JSON.parse(JSON.stringify(await courseService.getCourse(createResult.id)));

    baselineAfterCreate.trainer = {
      averageRating: '0.00',
      birthdate: '2017-06-14T17:00:00.000Z',
      cid: '0',
      firstname: 'Somlux',
      gender: 'MALE',
      lastname: 'Kamsing',
      numberOfRegisteredTrainees: 0,
      phoneNumber: '081234567',
      profileImageUrl:
        'https://www.aceshowbiz.com/images/photo/john_cena.jpg',
      userId: 'user-id-2',
    };
    baselineAfterCreate.price = '1999.00';

    expect(getResult).toEqual(baselineAfterCreate);

    const newCourse: CourseDto = {
      description: 'Make your arm big',
      district: 'Nong Jok',
      level: 'beginner',
      period: 10,
      price: 999.00,
      province: 'Bangkok',
      specialization: 'strength',
      title: 'Arm Strong',
    }

    const updateResult = JSON.parse(JSON.stringify(await courseService.updateCourse(createResult.id, newCourse)));

    let baselineAfterUpdate = {
      ...newCourse,
      id: updateResult.id,
      trainerUserId: 'user-id-2',
      trainer: baselineAfterCreate.trainer,
      price: "999.00",
    }

    expect(updateResult).toEqual(baselineAfterUpdate);
  });
});
