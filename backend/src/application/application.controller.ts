import {
  Controller,
  Req,
  UseGuards,
  Post,
  Param,
  Query,
  Get, Patch
} from "@nestjs/common";
import { LetXRequest } from 'src/middlewares/auth.middleware';
import { RoleGuard } from 'src/guards/role.guard';
import { Role } from 'src/decorators/role.decorator';
import { UserType } from 'src/register/enums/user-type.enum';
import { ApplicationService } from './application.service';
import { Application } from './entities/application.entity';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Appication')
@ApiBearerAuth()
@Controller('application')
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getApplication(@Req() request: LetXRequest): Promise<Application[]> {
    if (request.user.type === UserType.Trainee) {
      // TODO : use pagination for performance purpose
      return await this.applicationService.getTraineeApplications({
        traineeId: request.user.id,
      });
    } else {
      // TODO : use pagination for performance purpose
      return await this.applicationService.getTrainerApplications({
        trainerId: request.user.id,
      });
    }
  }

  @Get(':courseId')
  @Role(UserType.Trainer)
  @UseGuards(RoleGuard)
  async getApplicationByCourseId(
    @Param('courseId') courseId,
    @Req() request: LetXRequest,
  ): Promise<Application[]> {
    return await this.applicationService.getTrainerApplicationsByCourseId({
      courseId: courseId,
      trainerId: request.user.id,
    });
  }

  @Post(':courseId')
  @Role(UserType.Trainee)
  @UseGuards(RoleGuard)
  async applyCourse(
    @Param('courseId') courseId,
    @Req() request: LetXRequest,
  ): Promise<void> {
    return await this.applicationService.createWithApplicationInfoAndSave({
      courseId: courseId,
      traineeId: request.user.id,
    });
  }

  @Patch('/cancel/:courseId')
  @Role(UserType.Trainee)
  @UseGuards(RoleGuard)
  async cancelCourse(
    @Param('courseId') courseId,
    @Req() request: LetXRequest,
  ): Promise<void> {
    const application = await this.applicationService.getPendingApplication({
      courseId: courseId,
      traineeId: request.user.id,
    });
    application.cancel();
    await this.applicationService.remove(application);
  }

  @Patch('/approve/:courseId')
  @Role(UserType.Trainer)
  @UseGuards(RoleGuard)
  async approveCourse(
    @Param('courseId') courseId,
    @Query('traineeId') traineeId,
    @Req() request: LetXRequest,
  ): Promise<void> {
    const application = await this.applicationService.getPendingApplication({
      courseId: courseId,
      traineeId: traineeId,
    });
    await this.applicationService.validateTrainer({
      trainerId: request.user.id,
      application: application,
    });
    application.approve();
    await this.applicationService.save(application);
  }

  @Patch('/reject/:courseId')
  @Role(UserType.Trainer)
  @UseGuards(RoleGuard)
  async rejectCourse(
    @Param('courseId') courseId,
    @Query('traineeId') traineeId,
    @Req() request: LetXRequest,
  ): Promise<void> {
    const application = await this.applicationService.getPendingApplication({
      courseId: courseId,
      traineeId:  traineeId,
    });
    await this.applicationService.validateTrainer({
      trainerId: request.user.id,
      application: application,
    });
    application.reject();
    await this.applicationService.save(application);
  }
}
