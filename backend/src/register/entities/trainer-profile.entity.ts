import {
  Entity,
  Column,
  OneToOne,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserAuth } from '../../entities/user-auth.entity';
import { Preference } from './preference.entity';

@Entity({ name: 'trainer_profile' })
export class TrainerProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  @OneToOne(() => UserAuth, (userAuth) => userAuth.id)
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

  @ManyToMany(() => Preference, { cascade: true })
  @JoinTable({
    name: 'trainer_preference',
    joinColumn: {
      name: 'trainer_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'preference_id',
      referencedColumnName: 'id',
    },
  })
  preferences: Preference[];
}
