import { Trainer } from 'src/entities/trainer.entity';
import { Preference } from '../../preference/entities/preference.entity';

export interface TrainerProfileDto extends Trainer {
  email: string;
  preferences: Preference[];
}
