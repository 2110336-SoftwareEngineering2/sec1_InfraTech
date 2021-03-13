import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Trainer } from '../../entities/trainer.entity';
import { Application } from '../../application/entities/application.entity';

@Entity({ name: 'course' })
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

  @Column({ name: 'trainer_user_id' })
  trainerUserId: string;

  @OneToMany(() => Application, (application) => application.course)
  public applications: Application[];

  @ManyToOne(() => Trainer, (trainer) => trainer.courses)
  @JoinColumn({ name: 'trainer_user_id' })
  trainer: Trainer;
}
