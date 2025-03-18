import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id!: number; 

  @Column()
  title!: string; 

  @Column()
  author!: string; 

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'date', nullable: true })
  publicationDate?: Date; 

  @Column({ nullable: true })
  genre?: string; 

  @Column({ default: 0 })
  pages!: number; 

  @Column({ nullable: true })
  language?: string; 

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price!: number;  

  @CreateDateColumn()
  createdAt: Date; 

  @UpdateDateColumn()
  updatedAt: Date; 
}
