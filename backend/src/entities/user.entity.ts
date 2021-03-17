import { Exclude, Expose } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Preference } from '../preference/entities/preference.entity';
import { TrainerUseCases } from '../trainer/enums/trainer-use-cases.enum';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Expose({
    groups: [
      TrainerUseCases.GetTrainerByPreferences,
      TrainerUseCases.GetTrainerById,
    ],
  })
  id: string;

  @Column({ unique: true })
  @Expose({
    groups: [TrainerUseCases.GetTrainerById],
  })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  @Exclude()
  salt: string;

  @ManyToMany(() => Preference, { cascade: true })
  @JoinTable({
    name: 'user_preference',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'preference_id',
      referencedColumnName: 'id',
    },
  })
  @Expose({
    groups: [
      TrainerUseCases.GetTrainerByPreferences,
      TrainerUseCases.GetTrainerById,
    ],
  })
  preferences: Preference[];
}
