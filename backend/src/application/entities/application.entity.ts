import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Trainee } from '../../entities/trainee.entity';
import { Course } from '../../course/entities/course.entity';

export enum ApplicationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  CANCELED = 'canceled',
}

@Entity({ name: 'application' })
export class Application {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public status: ApplicationStatus;

  @Column({ name: 'trainee_user_id' })
  public traineeUserId: string;

  @Column({ name: 'course_id' })
  public courseId: string;

  @ManyToOne(() => Trainee, (trainee) => trainee.applications)
  @JoinColumn({ name: 'trainee_user_id' })
  public trainee: Trainee;

  @ManyToOne(() => Course, (course) => course.applications)
  @JoinColumn({ name: 'course_id' })
  public course: Course;

  public approve() {
    this.status = ApplicationStatus.APPROVED;
  }

  public cancel() {
    this.status = ApplicationStatus.CANCELED;
  }

  public reject() {
    this.status = ApplicationStatus.REJECTED;
  }
}
