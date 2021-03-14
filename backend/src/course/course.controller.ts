import {
  Controller,
  Req,
  Get,
  UseGuards,
  Patch,
  Body,
  ForbiddenException,
  Param,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { LetXRequest } from 'src/middlewares/auth.middleware';
import { Course } from './entities/course.entity';
import { RoleGuard } from 'src/guards/role.guard';
import { Role } from 'src/decorators/role.decorator';
import { UserType } from 'src/register/enums/user-type.enum';
import { CourseDto } from './dtos/course.dto';

@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Get()
  @Role(UserType.Trainer)
  @UseGuards(RoleGuard)
  async listCourses(@Req() request: LetXRequest): Promise<Course[]> {
    return await this.courseService.listCourses(request.user.id);
  }

  @Get(':id')
  @Role(UserType.Trainer)
  @UseGuards(RoleGuard)
  async getCourse(
    @Param('id') id,
    @Req() request: LetXRequest,
  ): Promise<Course> {
    let course: Course = await this.courseService.getCourse(id);

    if (course.trainerUserId != request.user.id) {
      throw new ForbiddenException();
    }

    return course;
  }

  @Post()
  @Role(UserType.Trainer)
  @UseGuards(RoleGuard)
  async createCourse(
    @Body() courseDto: CourseDto,
    @Req() request: LetXRequest,
  ): Promise<Course> {
    return await this.courseService.createCourse(request.user.id, courseDto);
  }

  @Put(':id')
  @Role(UserType.Trainer)
  @UseGuards(RoleGuard)
  async updateCourse(
    @Param('id') id,
    @Body() courseDto: CourseDto,
    @Req() request: LetXRequest,
  ): Promise<Course> {
    return await this.courseService.updateCourse(id, courseDto);
  }

  @Delete(':id')
  @Role(UserType.Trainer)
  @UseGuards(RoleGuard)
  async deleteCourse(
    @Param('id') id,
    @Req() request: LetXRequest,
  ): Promise<void> {
    let course = await this.courseService.getCourse(id);

    if (course.trainerUserId != request.user.id) {
      throw new ForbiddenException();
    }

    await this.courseService.deleteCourse(id);
  }
}
