import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import {List} from './list';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  link!: string;

  @Column()
  description!: string;

  @Column()
  active!: boolean;

  @ManyToOne((type) => List, (list) => list.purchase)
  @JoinColumn()
  list!: List;
}
