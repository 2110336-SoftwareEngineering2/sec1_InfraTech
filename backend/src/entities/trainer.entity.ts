import { Entity, Column, OneToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { User } from './user.entity';
@Entity({ name: 'trainer' })
export class Trainer {
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
}
