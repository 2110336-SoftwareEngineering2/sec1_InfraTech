import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { Trainer } from 'src/entities/trainer.entity';
import { Trainee } from 'src/entities/trainee.entity';
import { Preference } from '../preference/entities/preference.entity';
import { Course } from './entities/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Trainer, Trainee, Course])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
