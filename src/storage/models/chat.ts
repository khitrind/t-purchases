import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import {List} from './list';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index({unique: true})
  @Column()
  chatId!: number;

  @OneToMany((type) => List, (list) => list.chat)
  @JoinColumn()
  events!: List[];
}
