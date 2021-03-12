import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Connection, EntityTarget } from 'typeorm';
import { User } from '../entities/user.entity';
import { Trainer } from 'src/entities/trainer.entity';
import { Trainee } from 'src/entities/trainee.entity';
import { UserType } from 'src/register/enums/user-type.enum';
import { LetXRequest, AuthUserGetter } from 'src/middlewares/auth.middleware';
import { TrainerProfileDto } from './dtos/trainer-profile-dto';
import { TraineeProfileDto } from './dtos/trainee-profile-dto';
import { UpdateTrainerProfileDto } from './dtos/update-trainer-profile-dto';
import { UpdateTraineeProfileDto } from './dtos/update-trainee-profile-dto';
import { Preference } from '../preference/entities/preference.entity';
import { omit } from 'lodash';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Trainee)
    private traineeRepository: Repository<Trainee>,
    @InjectRepository(Trainer)
    private trainerRepository: Repository<Trainer>,
    @InjectRepository(Preference)
    private preferenceRepository: Repository<Preference>,
    private connection: Connection,
  ) {}

  resolveRepository(type: string): Repository<Trainee | Trainer> {
    if (type == UserType.Trainer) {
      return this.trainerRepository;
    } else {
      return this.traineeRepository;
    }
  }

  resolveEntityTarget(
    type: string,
  ): EntityTarget<Trainee> | EntityTarget<Trainee> {
    if (type == UserType.Trainer) {
      return Trainer;
    } else {
      return Trainee;
    }
  }

  async loadProfile(
    authUser: AuthUserGetter,
  ): Promise<TraineeProfileDto | TrainerProfileDto> {
    const user = await this.userRepository.findOneOrFail({
      where: {
        id: authUser.id,
      },
      relations: ['preferences'],
    });

    const profile = await this.resolveRepository(authUser.type).findOneOrFail({
      where: { user },
      relations: ['user'],
    });

    return {
      userId: user.id,
      ...omit(profile, ['user']),
      email: user.email,
      type: authUser.type as UserType,
      preferences: user.preferences,
    };
  }

  async getProfileFromRequest(
    request: LetXRequest,
  ): Promise<TrainerProfileDto | TraineeProfileDto> {
    return await this.loadProfile(request.user);
  }

  async updateProfile(
    request: LetXRequest,
    updateTrainerProfileDto: UpdateTrainerProfileDto | UpdateTraineeProfileDto,
  ): Promise<TrainerProfileDto> {
    const user = await this.userRepository.findOneOrFail({
      where: { id: request.user.id },
      relations: ['preferences'],
    });

    const Profile = this.resolveEntityTarget(request.user.type);
    const profile = await this.resolveRepository(
      request.user.type,
    ).findOneOrFail({
      where: { user },
      relations: ['user'],
    });

    if (updateTrainerProfileDto.hasOwnProperty('email')) {
      user.email = updateTrainerProfileDto.email;
    }

    if (updateTrainerProfileDto.hasOwnProperty('preferences')) {
      const selectedPreferences = await this.preferenceRepository.find({
        where: { id: In(updateTrainerProfileDto.preferences) },
      });
      user.preferences = selectedPreferences;
    }

    for (const key of Object.keys(
      omit(updateTrainerProfileDto, ['email', 'preferences']),
    )) {
      profile[key] = updateTrainerProfileDto[key];
    }

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(User, user);
      await queryRunner.manager.save(Profile, profile);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw new InternalServerErrorException();
    }

    return {
      userId: user.id,
      ...omit(profile, ['user']),
      email: user.email,
      type: request.user.type as UserType,
      preferences: user.preferences,
    };
  }
}
