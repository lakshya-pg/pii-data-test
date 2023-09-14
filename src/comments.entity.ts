import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  articleId: number;

  @Column()
  text: string;
}
