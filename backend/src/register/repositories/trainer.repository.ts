import { EntityRepository, Repository } from 'typeorm';
import { RegisterFormDto } from '../dtos/register-form-dto';
import { Trainer } from '../../entities/trainer.entity';
import { User } from '../../entities/user.entity';

@EntityRepository(Trainer)
export class TrainerRepository extends Repository<Trainer> {
  createUsingRegisterForm(
    user: User,
    registerFormDto: RegisterFormDto,
  ): Trainer {
    const {
      firstname,
      lastname,
      cid,
      gender,
      birthdate,
      phoneNumber,
      profileImageUrl,
    } = registerFormDto;

    const profile = this.create();

    profile.user = user;
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
