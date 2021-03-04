import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { Trainer } from '../entities/trainer.entity';
import { TrainerService } from './trainer.service';
import { TrainerSearchCriteriaDto } from './dtos/trainer-search-criteria-dto';

@Controller('trainer')
export class TrainerController {
  constructor(private trainerService: TrainerService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    groups: ['search'],
  })
  @Get('preferences')
  async getTrainersByPreferences(
    @Body() trainerSearchCriteriaDto: TrainerSearchCriteriaDto,
  ): Promise<Trainer[]> {
    return this.trainerService.getTrainersByPreferences(
      trainerSearchCriteriaDto,
    );
  }
}
