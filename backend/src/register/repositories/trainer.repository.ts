import { EntityRepository, Repository } from 'typeorm';
import { RegisterFormDto } from '../dtos/register-form-dto';
import { Trainer } from '../../entities/trainer.entity';

@EntityRepository(Trainer)
export class TrainerRepository extends Repository<Trainer> {
  createUsingRegisterForm(
    userId: string,
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

    profile.userId = userId;
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
