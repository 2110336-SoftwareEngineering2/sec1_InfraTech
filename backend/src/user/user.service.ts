import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { Builder } from 'builder-pattern';
import { RegisterFormDto } from '../register/dtos/register-form-dto';
import { Preference } from '../preference/entities/preference.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  private saltRounds = 10;

  constructor(
    @InjectRepository(User)
    private traineeRepository: Repository<User>,
  ) {}

  async createWithRegistrationInfo(
    registrationInfo: RegisterFormDto,
    preferences: Preference[],
  ): Promise<User> {
    const userBuilder = Builder(User)
      .email(registrationInfo.email)
      .preferences(preferences);

    const salt = await bcrypt.genSalt(this.saltRounds);
    const hash = await bcrypt.hash(registrationInfo.password, salt);

    userBuilder.password(hash).salt(salt);

    return userBuilder.build();
  }
}
