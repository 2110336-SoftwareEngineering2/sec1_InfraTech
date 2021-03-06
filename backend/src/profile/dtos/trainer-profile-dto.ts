import { Trainer } from 'src/entities/trainer.entity';
import { Preference } from '../../preference/entities/preference.entity';
import { UserType } from '../../register/enums/user-type.enum';

export interface TrainerProfileDto extends Trainer {
  user: never;

  userId: string;
  email: string;
  type: UserType;
  preferences: Preference[];
}
