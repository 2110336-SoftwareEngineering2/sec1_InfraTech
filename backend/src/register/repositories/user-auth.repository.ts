import { EntityRepository, Repository } from 'typeorm';
import { UserAuth } from '../../entities/user-auth.entity';
import { RegisterFormDto } from '../dtos/register-form-dto';
import * as bcrypt from 'bcryptjs';

@EntityRepository(UserAuth)
export class UserAuthRepository extends Repository<UserAuth> {
  async createUsingRegisterForm(
    registerFormDto: RegisterFormDto,
  ): Promise<UserAuth> {
    const { email, password } = registerFormDto;
    const userAuth = this.create();
    userAuth.email = email;
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

          userAuth.password = hash;
          userAuth.salt = salt;
          resolve();
        });
      });
    });
    //#endregion
    return userAuth;
  }
}
