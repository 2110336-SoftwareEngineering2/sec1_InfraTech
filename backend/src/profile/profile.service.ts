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
import { LetXRequest, TrainerProfileDto, TraineeProfileDto } from 'src/middlewares/auth.middleware';

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

  async getProfileFromRequest(request: LetXRequest): Promise<TrainerProfileDto | TraineeProfileDto> {
    try {
      return await request.user.loadProfile(request.user.resolveRepository(this.traineeRepository, this.trainerRepository));
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException();
    }
  }
}
