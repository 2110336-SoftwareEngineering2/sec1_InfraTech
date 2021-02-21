import { Body, Controller, Post, Req, Get } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { LetXRequest, TrainerProfileDto, TraineeProfileDto } from 'src/middlewares/auth.middleware';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  // TODO: Use decorator for guarding
  @Get('me')
  async me(@Req() request: LetXRequest): Promise<TrainerProfileDto | TraineeProfileDto> {
    return this.profileService.getProfileFromRequest(request);
  }
}
