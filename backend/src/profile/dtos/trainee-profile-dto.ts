import { Trainee } from 'src/entities/trainee.entity';
import { Preference } from '../../preference/entities/preference.entity';
import { UserType } from '../../register/enums/user-type.enum';

export interface TraineeProfileDto extends Trainee {
  email: string;
  type: UserType;
  preferences: Preference[];
}
