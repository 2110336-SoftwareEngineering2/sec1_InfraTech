import {
  Controller,
  Req,
  UseGuards,
  Body,
  Post, Param
} from "@nestjs/common";
import { LetXRequest } from 'src/middlewares/auth.middleware';
import { RoleGuard } from 'src/guards/role.guard';
import { Role } from 'src/decorators/role.decorator';
import { UserType } from 'src/register/enums/user-type.enum';
import { TraineeService } from '../trainee/trainee.service';
import { Trainee } from '../entities/trainee.entity';

@Controller('application')
export class ApplicationController {
  constructor(private traineeService: TraineeService) {}

  @Post(':courseId')
  @Role(UserType.Trainee)
  @UseGuards(RoleGuard)
  async createCourse(
    @Param('courseId') courseId,
    @Req() request: LetXRequest,
  ): Promise<Trainee> {
    return this.traineeService.applyCourse({
      courseId: courseId,
      userId: request.user.id,
    });
  }
}
