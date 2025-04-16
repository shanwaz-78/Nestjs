import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Task } from 'src/task/entities/task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Task, (task) => task.user, {
    nullable: false,
    onUpdate: "CASCADE",
  })
  tasks: Task;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    const saltOfRounds = parseInt(process.env.SALT_OF_ROUNDS, 10) ?? 15;
    this.password = await bcrypt.hash(this.password, saltOfRounds);
  }
}
