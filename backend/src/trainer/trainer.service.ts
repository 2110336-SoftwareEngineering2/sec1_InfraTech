import { Injectable } from '@nestjs/common';
import { Trainer } from 'src/entities/trainer.entity';
import { TrainerSearchCriteriaDto } from './dtos/trainer-search-criteria-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TrainerRepository } from '../register/repositories/trainer.repository';
import { Connection, In } from 'typeorm';

@Injectable()
export class TrainerService {
  constructor(
    @InjectRepository(Trainer)
    private trainerRepository: TrainerRepository,
    private connection: Connection,
  ) {}

  async getTrainersByPreferences(
    trainerSearchCriteriaDto: TrainerSearchCriteriaDto,
  ): Promise<Trainer[]> {
    const { preferences } = trainerSearchCriteriaDto;

    const userPreferences = await this.connection
      .createQueryBuilder()
      .select('up.user_id')
      .distinct(true)
      .from('user_preference', 'up')
      .where('up.preference_id IN (:...preferenceIds)', {
        preferenceIds: preferences,
      })
      .getRawMany();

    const userIds = userPreferences.map(
      (userPreference) => userPreference['up_user_id'],
    );

    const trainers = await this.trainerRepository
      .createQueryBuilder('trainer')
      .select([
        'trainer.firstname',
        'trainer.lastname',
        'trainer.profileImageUrl',
        'user.id',
        'preference.id',
        'preference.name',
      ])
      .innerJoin('trainer.user', 'user')
      .innerJoin('user.preferences', 'preference')
      .where('user.id IN (:...userIds)', {
        userIds,
      })
      .getMany();

    return trainers;
  }
}
