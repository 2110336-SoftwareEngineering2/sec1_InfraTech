import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken';
import { Trainer } from 'src/entities/trainer.entity';
import { Trainee } from 'src/entities/trainee.entity';
import { UserType } from 'src/register/enums/user-type.enum';
import { LetXRequest, TrainerProfileDto, TraineeProfileDto, AuthUserGetter } from 'src/middlewares/auth.middleware';

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

  async loadProfile(user: AuthUserGetter): Promise<TraineeProfileDto | TrainerProfileDto> {
    let profile = await this.resolveRepository(user.type).findOneOrFail({
      where: {
        userId: user.id
      }
    })

    return {
      id: user.id,
      email: user.email,
      type: user.type,
      profile: profile,
    }
  }

  async getProfileFromRequest(request: LetXRequest): Promise<TrainerProfileDto | TraineeProfileDto> {
    try {
      return await this.loadProfile(request.user);
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException();
    }
  }
}
