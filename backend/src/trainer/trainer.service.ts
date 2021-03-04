import { Injectable } from '@nestjs/common';
import { Trainer } from 'src/entities/trainer.entity';
import { TrainerSearchCriteriaDto } from './dtos/trainer-search-criteria-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TrainerRepository } from '../register/repositories/trainer.repository';
import { Connection } from 'typeorm';
import { TrainerSortBy } from './enums/trainer-sort-by.enum';

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
    const { preferences, sortBy } = trainerSearchCriteriaDto;

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

    const trainerQuery = this.trainerRepository
      .createQueryBuilder('trainer')
      .select([
        'trainer.firstname',
        'trainer.lastname',
        'trainer.profileImageUrl',
        'user.id',
        'preference.id',
        'preference.name',
        'review',
      ])
      .leftJoin('trainer.user', 'user')
      .leftJoin('user.preferences', 'preference')
      .leftJoin('trainer.reviews', 'review');

    if (userIds.length > 0) {
      trainerQuery.where('user.id IN (:...userIds)', {
        userIds,
      });
    }

    const trainers = await trainerQuery.getMany();

    if (sortBy === TrainerSortBy.AverageRating) {
      trainers.sort((trainer1, trainer2) =>
        trainer1.averageRating < trainer2.averageRating ? 1 : -1,
      );
    }

    return trainers;
  }
}
