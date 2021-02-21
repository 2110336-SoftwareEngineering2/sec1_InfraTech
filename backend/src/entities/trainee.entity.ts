import { Entity, Column, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'trainee' })
export class Trainee {
  @PrimaryColumn({ name: 'user_id' })
  @OneToOne(() => User, (user) => user.id)
  userId: string;

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
}
