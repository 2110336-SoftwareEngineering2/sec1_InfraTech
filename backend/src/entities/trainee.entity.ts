import { Entity, Column, OneToOne, PrimaryColumn, JoinColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { User } from './user.entity';
import { Course } from "../course/entities/course.entity";
import { Application } from "../application/entities/application.entity";

@Entity({ name: 'trainee' })
export class Trainee {
  @PrimaryColumn({ name: 'user_id' })
  id: string;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  gender: string;

  @Column()
  birthdate: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column({ name: 'profile_image_url' })
  profileImageUrl: string;

  @OneToMany(() => Application, (traineeToCourse) => traineeToCourse.course)
  public applications: Application[];
}
