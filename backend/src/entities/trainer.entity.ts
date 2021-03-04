import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Review } from '../trainer/entities/review.entity';
import { Expose } from 'class-transformer';
@Entity({ name: 'trainer' })
export class Trainer {
  @PrimaryColumn({ name: 'user_id' })
  userId: string;

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

  @OneToOne(() => User, (user) => user.id, { primary: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Expose({ groups: [] })
  @OneToMany(() => Review, (review) => review.trainer)
  reviews: Review[];
}
