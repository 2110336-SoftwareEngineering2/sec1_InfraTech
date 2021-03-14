import { Entity, Column, OneToOne, PrimaryColumn, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Course } from '../course/entities/course.entity';
@Entity({ name: 'trainer' })
export class Trainer {
  @PrimaryColumn({ name: 'user_id' })
  public userId: string;

  @OneToOne(() => User, (user) => user.id, { primary: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  cid: string;

  @Column()
  gender: string;

  @Column()
  birthdate: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column({ name: 'profile_image_url' })
  profileImageUrl: string;

  @OneToMany(() => Course, course => course.trainer)
  courses: Course[];
}
