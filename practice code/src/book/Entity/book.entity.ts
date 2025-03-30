import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  bookName: string;

  @Column({ length: 10 })
  bookAuthor: string;

  @Column('text', { array: true })
  genre: string[];

  @CreateDateColumn({ type: 'timestamp' })
  publishedAt: Date;
}
