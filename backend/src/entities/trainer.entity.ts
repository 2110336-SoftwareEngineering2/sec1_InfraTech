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

  @OneToMany(() => Course, course => course.trainer)
  courses: Course[];

  @OneToOne(() => User, (user) => user.id, { primary: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Expose({ groups: [] })
  @OneToMany(() => Review, (review) => review.trainer)
  reviews: Review[];

  @Expose({ groups: ['search'] })
  get averageRating(): number {
    if (this.reviews?.length > 0) {
      const sumOfRating = this.reviews.reduce(
        (total, { rating }) => total + rating,
        0,
      );
      const numberOfReviews = this.reviews.length;
      return sumOfRating / numberOfReviews;
    } else {
      return 0;
    }
  }
}
