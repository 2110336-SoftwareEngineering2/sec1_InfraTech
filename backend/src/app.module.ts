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
import { TraineeModule } from './trainee/trainee.module';
import { UserModule } from './user/user.module';

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
    TraineeModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
