import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Trainer } from '../../entities/trainer.entity';

@Entity({ name: 'faq' })
export class FAQ {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  question: string;

  @Column()
  answer: string;

  @Column({ name: 'trainer_user_id' })
  trainerUserId: string;

  @ManyToOne(() => Trainer, (trainer) => trainer.faqs)
  @JoinColumn({ name: 'trainer_user_id', referencedColumnName: 'userId' })
  trainer: Trainer;
}
