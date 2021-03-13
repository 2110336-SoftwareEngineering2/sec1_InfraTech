import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Trainee } from '../../entities/trainee.entity';
import { Course } from '../../course/entities/course.entity';

@Entity({ name: 'application' })
export class Application {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public approved: boolean;

  @Column()
  public finished: boolean;

  @Column({ name: 'trainee_user_id' })
  public traineeUserId: string;

  @Column({ name: 'course_id' })
  public courseId: string;

  @ManyToOne(() => Trainee, (trainee) => trainee.applications)
  @JoinColumn({ name: 'trainee_user_id' })
  public trainee: Trainee;

  @ManyToOne(() => Course, (course) => course.applications )
  @JoinColumn({ name: 'course_id' })
  public course: Course;
}
