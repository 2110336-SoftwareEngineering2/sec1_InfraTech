import {
  Entity,
  Column,
  OneToOne,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../../entities/user.entity';
import { Preference } from './preference.entity';

@Entity({ name: 'trainer' })
export class Trainer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  @OneToOne(() => User, (user) => user.id)
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