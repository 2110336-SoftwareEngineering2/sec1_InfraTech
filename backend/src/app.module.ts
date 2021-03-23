import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { ProfileModule } from './profile/profile.module';
import { PreferenceModule } from './preference/preference.module';
import { TrainerModule } from './trainer/trainer.module';
import * as config from 'config';
import { CourseModule } from './course/course.module';
import { ApplicationModule } from './application/application.module';
import { FAQModule } from './faq/faq.module';
import { ReviewModule } from './review/review.module';

const dbConfig = config.get('db');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // TODO: use configs
      type: 'mysql',
      host: dbConfig.host,
      port: dbConfig.port,
      username: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: dbConfig.synchronize,
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
})
export class AppModule {}
