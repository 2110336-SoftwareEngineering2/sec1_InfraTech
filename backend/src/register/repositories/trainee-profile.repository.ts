import { EntityRepository, Repository } from 'typeorm';
import { RegisterFormDto } from '../dtos/register-form-dto';
import { TraineeProfile } from '../entities/trainee-profile.entity';

@EntityRepository(TraineeProfile)
export class TraineeProfileRepository extends Repository<TraineeProfile> {
  createUsingRegisterForm(
    userId: string,
    registerFormDto: RegisterFormDto,
  ): TraineeProfile {
    const {
      firstname,
      lastname,
      gender,
      birthdate,
      phoneNumber,
      profileImageUrl,
    } = registerFormDto;

    const profile = this.create();

    profile.userId = userId;
    profile.firstname = firstname;
    profile.lastname = lastname;
    profile.gender = gender;
    profile.birthdate = birthdate;
    profile.phoneNumber = phoneNumber;
    profile.profileImageUrl = profileImageUrl;

    return profile;
  }
}
