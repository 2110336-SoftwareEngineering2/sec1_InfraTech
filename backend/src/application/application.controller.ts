import {
  Controller,
  Req,
  UseGuards,
  Body,
  Post,
} from '@nestjs/common';
import { LetXRequest } from 'src/middlewares/auth.middleware';
import { RoleGuard } from 'src/guards/role.guard';
import { Role } from 'src/decorators/role.decorator';
import { UserType } from 'src/register/enums/user-type.enum';
import { TraineeService } from '../trainee/trainee.service';
import { ApplicationDto } from './dtos/application.dto';
import { Trainee } from '../entities/trainee.entity';

@Controller('application')
export class ApplicationController {
  constructor(private traineeService: TraineeService) {}

  @Post()
  @Role(UserType.Trainee)
  @UseGuards(RoleGuard)
  async createCourse(
    @Body() applicationDto: ApplicationDto,
    @Req() request: LetXRequest,
  ): Promise<Trainee> {
    return this.traineeService.applyCourse({
      courseId: applicationDto.courseId,
      userId: request.user.id,
    });
  }
}
