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
    user: AuthUserGetter,
  ): Promise<TraineeProfileDto | TrainerProfileDto> {
    const profile = await this.resolveRepository(user.type).findOneOrFail({
      where: {
        userId: user.id,
      },
    });

    return {
      id: user.id,
      email: user.email,
      type: user.type,
      profile: profile,
    };
  }

  async getProfileFromRequest(
    request: LetXRequest,
  ): Promise<TrainerProfileDto | TraineeProfileDto> {
    return await this.loadProfile(request.user);
  }
}
