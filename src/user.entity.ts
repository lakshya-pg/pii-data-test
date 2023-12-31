// src/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, AfterLoad } from 'typeorm';
import { aesDecrypt } from './encryption';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  countryCode: string;

  @Column()
  address: string;

  @Column()
  isActive: boolean;

  @Column()
  remarks: string;
}
