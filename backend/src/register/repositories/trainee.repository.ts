import { EntityRepository, Repository } from 'typeorm';
import { RegisterFormDto } from '../dtos/register-form-dto';
import { Trainee } from '../../entities/trainee.entity';
import { User } from '../../entities/user.entity';

@EntityRepository(Trainee)
export class TraineeRepository extends Repository<Trainee> {
  createUsingRegisterForm(
    user: User,
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

    profile.user = user;
    profile.firstname = firstname;
    profile.lastname = lastname;
    profile.gender = gender;
    profile.birthdate = birthdate;
    profile.phoneNumber = phoneNumber;
    profile.profileImageUrl = profileImageUrl;

    return profile;
  }
}
