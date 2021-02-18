import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, In, Repository } from 'typeorm';

import { RegisterFormDto } from './dtos/register-form-dto';
import { UserAuth } from '../entities/user-auth.entity';
import { TrainerProfile } from './entities/trainer-profile.entity';
import { TraineeProfile } from './entities/trainee-profile.entity';
import { UserType } from './enums/user-type.enum';
import { UserAuthRepository } from './repositories/user-auth.repository';
import { TrainerProfileRepository } from './repositories/trainer-profile.repository';
import { TraineeProfileRepository } from './repositories/trainee-profile.repository';
import { Preference } from './entities/preference.entity';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(UserAuth)
    private userAuthRepository: UserAuthRepository,
    @InjectRepository(TrainerProfile)
    private trainerProfileRepository: TrainerProfileRepository,
    @InjectRepository(TraineeProfile)
    private traineeProfileRepository: TraineeProfileRepository,
    @InjectRepository(Preference)
    private preferenceRepository: Repository<Preference>,
    private connection: Connection,
  ) {}

  async register(registerFormDto: RegisterFormDto): Promise<UserAuth> {
    const { userType, preferences } = registerFormDto;

    const userAuth = await this.userAuthRepository.createUsingRegisterForm(
      registerFormDto,
    );

    const selectedPreferences = await this.preferenceRepository.find({
      where: { id: In(preferences) },
    });

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await queryRunner.manager.insert(UserAuth, userAuth);
      const userId = result.identifiers[0].id;

      const ProfileEntity =
        userType === UserType.Trainer ? TrainerProfile : TraineeProfile;
      const profile =
        userType === UserType.Trainer
          ? this.trainerProfileRepository.createUsingRegisterForm(
              userId,
              registerFormDto,
              selectedPreferences,
            )
          : this.traineeProfileRepository.createUsingRegisterForm(
              userId,
              registerFormDto,
              selectedPreferences,
            );

      await queryRunner.manager.save(ProfileEntity, profile);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();

      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('This email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    // TODO: return view entity (UserAuth join with Profile)
    return userAuth;
  }
}
