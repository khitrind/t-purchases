import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';
import {Chat} from './chat';
import {Purchase} from './purchase';

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  date!: string;

  @Column()
  active!: boolean;

  @Column()
  name!: string;

  @ManyToOne((type) => Chat, (chat) => chat.events)
  chat!: Chat;

  @OneToMany((type) => Purchase, (purchase) => purchase.list)
  @JoinColumn()
  purchase!: Purchase[];

  @BeforeInsert()
  beforeInsertActions() {
    this.active = true;
  }
}
