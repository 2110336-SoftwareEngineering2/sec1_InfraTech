import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'preference' })
export class Preference {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'svg_url' })
  svgUrl: string;
}
