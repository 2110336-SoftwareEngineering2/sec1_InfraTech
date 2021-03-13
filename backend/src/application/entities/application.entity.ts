import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Trainee } from '../../entities/trainee.entity';
import { Course } from '../../course/entities/course.entity';

@Entity({ name: 'application' })
export class Application {
  @Column()
  public approved: boolean;

  @Column()
  public finished: boolean;

  @PrimaryColumn({ name: 'trainee_user_id' })
  public traineeUserId: string;

  @PrimaryColumn({ name: 'course_id' })
  public courseId: string;

  @ManyToOne(() => Trainee, (trainee) => trainee.applications)
  @JoinColumn({ name: 'trainee_user_id' })
  public trainee: Trainee;

  @ManyToOne(() => Course, (course) => course.applications)
  @JoinColumn({ name: 'course_id' })
  public course: Course;
}
