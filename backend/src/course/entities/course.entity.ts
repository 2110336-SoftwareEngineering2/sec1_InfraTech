import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Trainer } from '../../entities/trainer.entity';
import { Application } from '../../application/entities/application.entity';
import { Trainee } from 'src/entities/trainee.entity';

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

  @ManyToMany(() => Trainee, { cascade: true })
  @JoinTable({
    name: 'course_trainee',
    joinColumn: {
      name: 'course_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'trainee_user_id',
      referencedColumnName: 'user_id',
    },
  })
  trainees: Trainee[];

  @Column({ name: 'trainer_user_id' })
  trainerUserId: string;

  @OneToMany(() => Application, (application) => application.course)
  public applications: Application[];

  @ManyToOne(() => Trainer, (trainer) => trainer.courses)
  @JoinColumn({ name: 'trainer_user_id', referencedColumnName: 'user_id' })
  trainer: Trainer;
}
