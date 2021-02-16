import { Entity, Column, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserAuth } from '../../entities/user-auth.entity';

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
}
