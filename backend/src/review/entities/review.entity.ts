import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
} from 'typeorm';
import { Trainer } from '../../entities/trainer.entity';
import { Trainee } from '../../entities/trainee.entity';
import { Application } from '../../application/entities/application.entity';

@Entity({ name: 'review' })
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Trainee)
  @JoinColumn({ name: 'trainee_user_id', referencedColumnName: 'userId' })
  trainee: Trainee;

  @ManyToOne(() => Trainer, (trainer) => trainer.reviews)
  @JoinColumn({ name: 'trainer_user_id', referencedColumnName: 'userId' })
  trainer: Trainer;

  @OneToOne(() => Application)
  @JoinColumn({ name: 'application_id', referencedColumnName: 'id' })
  application: Application;

  @Column()
  comment: string;

  @Column()
  rating: number;
}
