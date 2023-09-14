// src/entities/user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Users } from './user.entity';

@Entity()
export class Articles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  @JoinColumn({ name: 'userId' })
  @OneToOne((type) => Users, (user) => user.id)
  userId: string;

  @Column()
  isActive: string;
}
