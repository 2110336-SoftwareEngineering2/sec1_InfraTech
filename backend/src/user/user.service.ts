import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { Builder } from 'builder-pattern';
import { Preference } from '../preference/entities/preference.entity';
import * as bcrypt from 'bcryptjs';

interface RegistrationInfo {
  email: string;
  password: string;
  preferences: Preference[];
}

@Injectable()
export class UserService {
  private saltRounds = 10;

  constructor(
    @InjectRepository(User)
    private traineeRepository: Repository<User>,
  ) {}

  async createWithRegistrationInfo({
    email,
    password,
    preferences,
  }: RegistrationInfo): Promise<User> {
    const userBuilder = Builder(User).email(email).preferences(preferences);

    const salt = await bcrypt.genSalt(this.saltRounds);
    const hash = await bcrypt.hash(password, salt);

    userBuilder.password(hash).salt(salt);

    return userBuilder.build();
  }
}
