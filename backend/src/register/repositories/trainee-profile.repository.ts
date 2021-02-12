import { EntityRepository, Repository } from 'typeorm';
import { UserAuth } from '../../entities/user-auth.entity';
import { RegisterFormDto } from '../dtos/register-form-dto';
import { TraineeProfile } from '../entities/trainee-profile.entity';

@EntityRepository(UserAuth)
export class TraineeProfileRepository extends Repository<TraineeProfile> {
  createTraineeProfile(registerFormDto: RegisterFormDto): TraineeProfile {
    const {
      email,
      firstname,
      lastname,
      gender,
      birthdate,
      phoneNumber,
      profileImageUrl,
    } = registerFormDto;

    const profile = this.create();

    profile.email = email;
    profile.firstname = firstname;
    profile.lastname = lastname;
    profile.gender = gender;
    profile.birthdate = birthdate;
    profile.phoneNumber = phoneNumber;
    profile.profileImageUrl = profileImageUrl;

    return profile;
  }
}
