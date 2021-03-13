import { Controller, Req, UseGuards, Body, Post, Param, Query } from "@nestjs/common";
import { LetXRequest } from 'src/middlewares/auth.middleware';
import { RoleGuard } from 'src/guards/role.guard';
import { Role } from 'src/decorators/role.decorator';
import { UserType } from 'src/register/enums/user-type.enum';
import { ApplicationService } from './application.service';

@Controller('application')
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}

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

  @Post('/cancel/:courseId')
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
    await this.applicationService.save(application);
  }

  @Post('/approve/:courseId')
  @Role(UserType.Trainer)
  @UseGuards(RoleGuard)
  async approveCourse(
    @Param('courseId') courseId,
    @Query('traineeId') traineeId,
    @Req() request: LetXRequest,
  ): Promise<void> {
    const application = await this.applicationService.getPendingApplication({
      courseId: courseId,
      traineeId: request.user.id,
    });
    await this.applicationService.validateTrainer({
      trainerId: traineeId,
      application: application,
    });
    application.approve();
    await this.applicationService.save(application);
  }

  @Post('/reject/:courseId')
  @Role(UserType.Trainer)
  @UseGuards(RoleGuard)
  async rejectCourse(
    @Param('courseId') courseId,
    @Query('traineeId') traineeId,
    @Req() request: LetXRequest,
  ): Promise<void> {
    const application = await this.applicationService.getPendingApplication({
      courseId: courseId,
      traineeId: request.user.id,
    });
    await this.applicationService.validateTrainer({
      trainerId: traineeId,
      application: application,
    });
    application.reject();
    await this.applicationService.save(application);
  }
}
