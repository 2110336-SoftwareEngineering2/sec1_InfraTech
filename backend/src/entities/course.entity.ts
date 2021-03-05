import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { Preference } from '../preference/entities/preference.entity';
import { Trainee } from './trainee.entity';
import { Trainer } from './trainer.entity';

@Entity({ name: 'user' })
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  level: string;

  @Column()
  specialization: string;

  @Column()
  price: number;

  @Column()
  period: number;

  @ManyToMany(() => Trainee, { cascade: true })
  @JoinTable({
    name: 'course_trainee',
    joinColumn: {
      name: 'course_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'trainee_user_id',
      referencedColumnName: 'user',
    },
  })
  trainees: Trainee[];

  @ManyToOne(() => Trainer, trainer => trainer.courses)
  trainer: Trainer;
}
