import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
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

import config from '../config/development';

const dbConfig = config.db;

describe('Course Module', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          // TODO: use configs
          type: 'mysql',
          host: dbConfig.host,
          port: 3307,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.database,
          entities: ['dist/**/*.entity{.ts,.js}'],
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
  });

  it('/ (GET)', () => {
    
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
