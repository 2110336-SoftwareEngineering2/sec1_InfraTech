import { Controller, Req, Get, UseGuards, Patch, Body } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { LetXRequest } from 'src/middlewares/auth.middleware';
import { AuthGuard } from '../guards/auth.guard';
import { TrainerProfileDto } from './dtos/trainer-profile-dto';
import { TraineeProfileDto } from './dtos/trainee-profile-dto';
import { UpdateTrainerProfileDto } from './dtos/update-trainer-profile-dto';
import { UpdateTraineeProfileDto } from './dtos/update-trainee-profile-dto';
import { ApiBody, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';

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

  @Patch()
  @UseGuards(AuthGuard)
  @ApiExtraModels(UpdateTrainerProfileDto, UpdateTraineeProfileDto)
  @ApiBody({
    schema: {
      oneOf: [
        { $ref: getSchemaPath(UpdateTrainerProfileDto) },
        { $ref: getSchemaPath(UpdateTraineeProfileDto) },
      ],
    },
  })
  async updateProfile(
    @Req() request: LetXRequest,
    @Body()
    updateProfileDto: UpdateTrainerProfileDto | UpdateTraineeProfileDto,
  ): Promise<TrainerProfileDto> {
    return this.profileService.updateProfile(request, updateProfileDto);
  }
}
