import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { RegisterFormDto } from './dtos/register-form-dto';
import { UserAuth } from '../entities/user-auth.entity';
import { TrainerProfile } from './entities/trainer-profile.entity';
import { TraineeProfile } from './entities/trainee-profile.entity';
import { UserType } from './enums/user-type.enum';
import { UserAuthRepository } from './repositories/user-auth.repository';
import { TrainerProfileRepository } from './repositories/trainer-profile.repository';
import { TraineeProfileRepository } from './repositories/trainee-profile.repository';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(UserAuth)
    private userAuthRepository: UserAuthRepository,
    @InjectRepository(TrainerProfile)
    private trainerProfileRepository: TrainerProfileRepository,
    @InjectRepository(TraineeProfile)
    private traineeProfileRepository: TraineeProfileRepository,
    private connection: Connection,
  ) {}

  async register(registerFormDto: RegisterFormDto): Promise<UserAuth> {
    const { userType } = registerFormDto;

    const userAuth = await this.userAuthRepository.createUsingRegisterForm(
      registerFormDto,
    );

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
            )
          : this.traineeProfileRepository.createTraineeProfile(
              userId,
              registerFormDto,
            );

      await queryRunner.manager.insert(ProfileEntity, profile);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();

      console.log(error);

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
