import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, In, Repository } from 'typeorm';

import { RegisterFormDto } from './dtos/register-form-dto';
import { User } from '../entities/user.entity';
import { Trainer } from './entities/trainer.entity';
import { Trainee } from './entities/trainee.entity';
import { UserType } from './enums/user-type.enum';
import { UserRepository } from './repositories/user.repository';
import { TrainerRepository } from './repositories/trainer.repository';
import { TraineeRepository } from './repositories/trainee.repository';
import { Preference } from '../preference/entities/preference.entity';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
    @InjectRepository(Trainer)
    private trainerRepository: TrainerRepository,
    @InjectRepository(Trainee)
    private traineeRepository: TraineeRepository,
    @InjectRepository(Preference)
    private preferenceRepository: Repository<Preference>,
    private connection: Connection,
  ) {}

  async register(registerFormDto: RegisterFormDto): Promise<User> {
    const { userType, preferences } = registerFormDto;

    const selectedPreferences = await this.preferenceRepository.find({
      where: { id: In(preferences) },
    });

    const user = await this.userRepository.createUsingRegisterForm(
      registerFormDto,
      selectedPreferences,
    );

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await queryRunner.manager.save(User, user);
      const userId = result.id;

      const ProfileEntity = userType === UserType.Trainer ? Trainer : Trainee;
      const profile =
        userType === UserType.Trainer
          ? this.trainerRepository.createUsingRegisterForm(
              userId,
              registerFormDto,
            )
          : this.traineeRepository.createUsingRegisterForm(
              userId,
              registerFormDto,
            );

      await queryRunner.manager.save(ProfileEntity, profile);

      await queryRunner.commitTransaction();

      // TODO: return view entity (User but exclude preferences)
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('This email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
