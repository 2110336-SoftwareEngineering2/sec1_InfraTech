import {
  Controller,
  Req,
  Get,
  UseGuards,
  Patch,
  SetMetadata,
  Body,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { LetXRequest } from 'src/middlewares/auth.middleware';
import { AuthGuard } from '../guards/auth.guard';
import { TrainerProfileDto } from './dtos/trainer-profile-dto';
import { TraineeProfileDto } from './dtos/trainee-profile-dto';
import { UserType } from '../register/enums/user-type.enum';
import { RoleGuard } from '../guards/role.guard';
import { UpdateTrainerProfileDto } from './dtos/update-trainer-profile-dto';
import { Role } from '../decorators/role.decorator';
@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getProfile(
    @Req() request: LetXRequest,
  ): Promise<TrainerProfileDto | TraineeProfileDto> {
    return this.profileService.getProfileFromRequest(request);
  }

  @Patch('trainer')
  @Role(UserType.Trainer)
  @UseGuards(AuthGuard, RoleGuard)
  async updateTrainerProfile(
    @Req() request: LetXRequest,
    @Body() updateTrainerProfileDto: UpdateTrainerProfileDto,
  ): Promise<TrainerProfileDto> {
    return this.profileService.updateTrainerProfile(
      request,
      updateTrainerProfileDto,
    );
  }
}
