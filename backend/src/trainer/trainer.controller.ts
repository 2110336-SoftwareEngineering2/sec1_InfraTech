import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Param,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { Trainer } from '../entities/trainer.entity';
import { TrainerService } from './trainer.service';
import { TrainerSearchCriteriaDto } from './dtos/trainer-search-criteria-dto';
import { TrainerUseCases } from './enums/trainer-use-cases.enum';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Trainer')
@Controller('trainer')
export class TrainerController {
  constructor(private trainerService: TrainerService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    groups: [TrainerUseCases.GetTrainerByPreferences],
  })
  @Post('preferences')
  async getTrainersByPreferences(
    @Body() trainerSearchCriteriaDto: TrainerSearchCriteriaDto,
  ): Promise<Trainer[]> {
    return this.trainerService.getTrainersByPreferences(
      trainerSearchCriteriaDto,
    );
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    groups: [TrainerUseCases.GetTrainerById],
  })
  @Get(':id')
  async getTrainerById(@Param('id') id: string): Promise<Trainer> {
    return this.trainerService.getTrainerById(id);
  }
}
