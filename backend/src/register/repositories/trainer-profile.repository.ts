import { EntityRepository, Repository } from 'typeorm';
import { RegisterFormDto } from '../dtos/register-form-dto';
import { TrainerProfile } from '../entities/trainer-profile.entity';

@EntityRepository(TrainerProfile)
export class TrainerProfileRepository extends Repository<TrainerProfile> {
  createUsingRegisterForm(registerFormDto: RegisterFormDto): TrainerProfile {
    const {
      email,
      firstname,
      lastname,
      cid,
      gender,
      birthdate,
      phoneNumber,
      profileImageUrl,
    } = registerFormDto;

    const profile = this.create();

    profile.email = email;
    profile.firstname = firstname;
    profile.lastname = lastname;
    profile.cid = cid;
    profile.gender = gender;
    profile.birthdate = birthdate;
    profile.phoneNumber = phoneNumber;
    profile.profileImageUrl = profileImageUrl;

    return profile;
  }
}
