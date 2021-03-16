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
    const { preferences, sortBy, sortType, limit } = trainerSearchCriteriaDto;

    // TODO: split finding users that have the specific preferences logic
    let userIds;
    if (preferences?.length > 0) {
      const userPreferences = await this.connection
        .createQueryBuilder()
        .select('up.user_id')
        .distinct(true)
        .from('user_preference', 'up')
        .where('up.preference_id IN (:...preferenceIds)', {
          preferenceIds: preferences,
        })
        .getRawMany();

      userIds = userPreferences.map(
        (userPreference) => userPreference['up_user_id'],
      );
    }

    // TODO: split trainer querying logic
    const trainerQuery = this.trainerRepository
      .createQueryBuilder('trainer')
      .select([
        'trainer',
        'user.id',
        'preference.id',
        'preference.name',
        'review',
      ])
      .addSelect('CONCAT(trainer.firstname, trainer.lastname)', 'fullname')
      .leftJoin('trainer.user', 'user')
      .leftJoin('user.preferences', 'preference')
      .leftJoin('trainer.reviews', 'review');

    if (preferences?.length > 0) {
      if (userIds.length > 0) {
        trainerQuery.where('user.id IN (:...userIds)', {
          userIds,
        });
      } else {
        return [];
      }
    }

    if (sortBy == TrainerSortBy.AverageRating) {
      trainerQuery.orderBy('trainer.averageRating', sortType);
    } else if (sortBy == TrainerSortBy.Fullname) {
      trainerQuery.orderBy('fullname', sortType);
    }

    trainerQuery.take(limit);

    const trainers = await trainerQuery.getMany();

    return trainers;
  }

  async getTrainerById(id: string): Promise<Trainer> {
    return this.trainerRepository.findOneOrFail({
      where: { userId: id },
    });
  }
}
