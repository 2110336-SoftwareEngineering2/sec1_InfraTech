import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_auth' })
export class UserAuth {
  @PrimaryGeneratedColumn()
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;
}
