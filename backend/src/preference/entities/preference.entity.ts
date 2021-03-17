import { Expose } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TrainerUseCases } from '../../trainer/enums/trainer-use-cases.enum';

@Entity({ name: 'preference' })
export class Preference {
  @PrimaryGeneratedColumn('uuid')
  @Expose({
    groups: [
      TrainerUseCases.GetTrainerByPreferences,
      TrainerUseCases.GetTrainerById,
    ],
  })
  id: string;

  @Column()
  @Expose({
    groups: [
      TrainerUseCases.GetTrainerByPreferences,
      TrainerUseCases.GetTrainerById,
    ],
  })
  name: string;

  @Column({ name: 'svg_url' })
  @Expose({
    groups: [],
  })
  svgUrl: string;
}
