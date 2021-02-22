import { Trainee } from 'src/entities/trainee.entity';

export interface TraineeProfileDto {
  id: string;
  email: string;
  type: string;
  profile: Trainee;
}
