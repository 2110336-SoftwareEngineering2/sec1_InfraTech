import { Entity, Column, JoinColumn, PrimaryColumn } from 'typeorm';

@Entity({ name: 'user_auth' })
export class UserAuth {
  @PrimaryColumn()
  @JoinColumn()
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;
}
