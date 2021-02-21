import { EntityRepository, Repository } from 'typeorm';
import { RegisterFormDto } from '../dtos/register-form-dto';
import { Trainee } from '../../entities/trainee.entity';

@EntityRepository(Trainee)
export class TraineeRepository extends Repository<Trainee> {
  createUsingRegisterForm(
    userId: string,
    registerFormDto: RegisterFormDto,
  ): Trainee {
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
