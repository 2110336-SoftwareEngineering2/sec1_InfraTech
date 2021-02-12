import { Entity, Column, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_auth' })
export class UserAuth {
  @PrimaryGeneratedColumn('uuid')
  @JoinColumn()
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;
}
