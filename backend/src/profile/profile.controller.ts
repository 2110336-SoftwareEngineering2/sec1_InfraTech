import { Controller, Req, Get, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { LetXRequest } from 'src/middlewares/auth.middleware';
import { AuthGuard } from '../guards/auth.guard';
import { TrainerProfileDto } from './dtos/trainer-profile-dto';
import { TraineeProfileDto } from './dtos/trainee-profile-dto';
@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get()
  @UseGuards(AuthGuard)
  async me(
    @Req() request: LetXRequest,
  ): Promise<TrainerProfileDto | TraineeProfileDto> {
    return this.profileService.getProfileFromRequest(request);
  }
}
