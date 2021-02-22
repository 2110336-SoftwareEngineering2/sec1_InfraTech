import { Trainee } from 'src/entities/trainee.entity';
import { Preference } from '../../preference/entities/preference.entity';

export interface TraineeProfileDto extends Trainee {
  email: string;
  preferences: Preference[];
}
