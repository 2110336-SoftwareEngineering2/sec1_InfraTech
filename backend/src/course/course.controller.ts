import { Controller, Req, Get, UseGuards, Patch, Body, ForbiddenException } from '@nestjs/common';
import { CourseService } from './course.service';
import { LetXRequest } from 'src/middlewares/auth.middleware';
import { AuthGuard } from '../guards/auth.guard';
import { TrainerProfileDto } from './dtos/trainer-profile-dto';
import { TraineeProfileDto } from './dtos/trainee-profile-dto';
import { UpdateTrainerProfileDto } from './dtos/update-trainer-profile-dto';
import { UpdateTraineeProfileDto } from './dtos/update-trainee-profile-dto';
import { ApiBody, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { Course } from './entities/course.entity';
import { RoleGuard } from 'src/guards/role.guard';
import { Role } from 'src/decorators/role.decorator';
import { UserType } from 'src/register/enums/user-type.enum';

@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Get()
  @Role(UserType.Trainer)
  @UseGuards(RoleGuard)
  async listCourses(
    @Req() request: LetXRequest,
  ): Promise<Course[]> {
    return await this.courseService.listCourses(request.user.id);
  }

  @Get(':id')
  @Role(UserType.Trainer)
  @UseGuards(RoleGuard)
  async getCourse(
    @Req() request: LetXRequest,
  ): Promise<Course> {
    let course: Course = await this.courseService.getCourse(id);

    if (course.trainer.user.id != request.user.id) {
      throw new ForbiddenException();
    }

    return course;
  }
}
