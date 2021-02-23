import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Trainer } from 'src/entities/trainer.entity';
import { Trainee } from 'src/entities/trainee.entity';
import { UserType } from 'src/register/enums/user-type.enum';
import { LetXRequest, AuthUserGetter } from 'src/middlewares/auth.middleware';
import { TrainerProfileDto } from './dtos/trainer-profile-dto';
import { TraineeProfileDto } from './dtos/trainee-profile-dto';
import { omit } from 'lodash';
@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Trainee)
    private traineeRepository: Repository<Trainee>,
    @InjectRepository(Trainer)
    private trainerRepository: Repository<Trainer>,
  ) {}

  resolveRepository(type: string): Repository<Trainee | Trainer> {
    if (type == UserType.Trainer) {
      return this.trainerRepository;
    } else {
      return this.traineeRepository;
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
}
