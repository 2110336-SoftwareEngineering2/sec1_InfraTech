import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { RegisterFormDto } from './dtos/register-form-dto';
import { UserAuth } from '../entities/user-auth.entity';
import { TrainerProfile } from './entities/trainer-profile.entity';
import { TraineeProfile } from './entities/trainee-profile.entity';
import { UserType } from './enums/user-type.enum';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(UserAuth)
    private userAuthRepository: Repository<UserAuth>,
    @InjectRepository(TrainerProfile)
    private trainerProfileRepository: Repository<TrainerProfile>,
    @InjectRepository(TraineeProfile)
    private traineeProfileRepository: Repository<TraineeProfile>,
    private connection: Connection,
  ) {}

  async register(registerFormDto: RegisterFormDto): Promise<UserAuth> {
    const { userType } = registerFormDto;

    const userAuth = await this.createUserAuth(registerFormDto);
    const ProfileEntity =
      userType === UserType.Trainer ? TrainerProfile : TraineeProfile;
    const profile =
      userType === UserType.Trainer
        ? this.createTrainerProfile(registerFormDto)
        : this.createTraineeProfile(registerFormDto);

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.insert(UserAuth, userAuth);
      await queryRunner.manager.insert(ProfileEntity, profile);

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

  async createUserAuth(registerFormDto: RegisterFormDto): Promise<UserAuth> {
    const { email, password } = registerFormDto;
    const userAuth = this.userAuthRepository.create();
    // TODO: refactor duplicate hash logic
    // #region hash password
    const saltRounds = 10;

    await new Promise<void>((resolve, reject) => {
      bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) {
          reject(err);
          return;
        }

        bcrypt.hash(password, salt, function (err, hash) {
          // Store hash in your password DB.
          if (err) {
            reject(err);
            return;
          }

          userAuth.password = hash;
          userAuth.salt = salt;
          resolve();
        });
      });
    });
    //#endregion

    userAuth.email = email;
    return userAuth;
  }

  createTrainerProfile(registerFormDto: RegisterFormDto): TrainerProfile {
    const {
      email,
      firstname,
      lastname,
      cid,
      gender,
      birthdate,
      phoneNumber,
      profileImageUrl,
      preferences,
    } = registerFormDto;

    const profile = this.trainerProfileRepository.create();

    profile.email = email;
    profile.firstname = firstname;
    profile.lastname = lastname;
    profile.cid = cid;
    profile.gender = gender;
    profile.birthdate = birthdate;
    profile.phoneNumber = phoneNumber;
    profile.profileImageUrl = profileImageUrl;
    profile.preferences = preferences;

    return profile;
  }

  createTraineeProfile(registerFormDto: RegisterFormDto): TraineeProfile {
    const {
      email,
      firstname,
      lastname,
      gender,
      birthdate,
      phoneNumber,
      profileImageUrl,
      preferences,
    } = registerFormDto;

    const profile = this.traineeProfileRepository.create();

    profile.email = email;
    profile.firstname = firstname;
    profile.lastname = lastname;
    profile.gender = gender;
    profile.birthdate = birthdate;
    profile.phoneNumber = phoneNumber;
    profile.profileImageUrl = profileImageUrl;
    profile.preferences = preferences;

    return profile;
  }
}
