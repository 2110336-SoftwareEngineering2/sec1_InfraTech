import { Trainer } from 'src/entities/trainer.entity';

export interface TrainerProfileDto {
  id: string;
  email: string;
  type: string;
  profile: Trainer;
}
