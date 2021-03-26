import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Review } from '../review/entities/review.entity';
import { Expose } from 'class-transformer';
import { Course } from '../course/entities/course.entity';
import { FAQ } from '../faq/entities/faq.entity';
import { TrainerUseCases } from '../trainer/enums/trainer-use-cases.enum';
@Entity({ name: 'trainer' })
export class Trainer {
  @PrimaryColumn({ name: 'user_id' })
  @Expose({
    groups: [
      TrainerUseCases.GetTrainerByPreferences,
      TrainerUseCases.GetTrainerById,
    ],
  })
  userId: string;

  @Column()
  @Expose({
    groups: [
      TrainerUseCases.GetTrainerByPreferences,
      TrainerUseCases.GetTrainerById,
    ],
  })
  firstname: string;

  @Column()
  @Expose({
    groups: [
      TrainerUseCases.GetTrainerByPreferences,
      TrainerUseCases.GetTrainerById,
    ],
  })
  lastname: string;

  @Column()
  @Expose({ groups: [] })
  cid: string;

  @Column()
  @Expose({ groups: [TrainerUseCases.GetTrainerById] })
  gender: string;

  @Column()
  @Expose({ groups: [TrainerUseCases.GetTrainerById] })
  birthdate: string;

  @Column({ name: 'phone_number' })
  @Expose({ groups: [TrainerUseCases.GetTrainerById] })
  phoneNumber: string;

  @Column({ name: 'profile_image_url' })
  @Expose({
    groups: [
      TrainerUseCases.GetTrainerByPreferences,
      TrainerUseCases.GetTrainerById,
    ],
  })
  profileImageUrl: string;

  @OneToMany(() => Course, (course) => course.trainer)
  @Expose({ groups: [] })
  courses: Course[];

  @OneToOne(() => User, (user) => user.id, { primary: true })
  @JoinColumn({ name: 'user_id' })
  @Expose({
    groups: [
      TrainerUseCases.GetTrainerByPreferences,
      TrainerUseCases.GetTrainerById,
    ],
  })
  user: User;

  @OneToMany(() => Review, (review) => review.trainer)
  @Expose({ groups: [] })
  reviews: Review[];

  @Column({ name: 'average_rating' })
  @Expose({
    groups: [
      TrainerUseCases.GetTrainerByPreferences,
      TrainerUseCases.GetTrainerById,
    ],
  })
  averageRating: number;

  @Column({ name: 'number_of_registered_trainers' })
  @Expose({
    groups: [
      TrainerUseCases.GetTrainerByPreferences,
      TrainerUseCases.GetTrainerById,
    ],
  })
  numberOfRegisteredTrainer: number;

  @OneToMany(() => FAQ, (faq) => faq.trainer)
  @Expose({ groups: [] })
  faqs: FAQ[];

  increaseNumberOfRegisteredTrainer() {
    this.numberOfRegisteredTrainer += 1;
  }
}
