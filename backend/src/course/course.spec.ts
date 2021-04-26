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

const dbConfig = config.db;

describe('Course Module', () => {
  let app: INestApplication;
  let courseService: CourseService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          // TODO: use configs
          type: 'mysql',
          host: "127.0.0.1",
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
    expect(await courseService.listCourses("user-id-1")).toEqual([])
  });
});
