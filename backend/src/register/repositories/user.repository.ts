import { EntityRepository, Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { RegisterFormDto } from '../dtos/register-form-dto';
import { Preference } from '../../preferences/entities/preference.entity';
import * as bcrypt from 'bcryptjs';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUsingRegisterForm(
    registerFormDto: RegisterFormDto,
    preferences: Preference[],
  ): Promise<User> {
    const { email, password } = registerFormDto;
    const user = this.create();
    user.email = email;
    user.preferences = preferences;
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

          user.password = hash;
          user.salt = salt;
          resolve();
        });
      });
    });
    //#endregion
    return user;
  }
}
