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
import { TrainerUseCases } from './enums/trainer-use-cases.enum';

@Controller('trainer')
export class TrainerController {
  constructor(private trainerService: TrainerService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    groups: [TrainerUseCases.GetTrainerByPreferences],
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
