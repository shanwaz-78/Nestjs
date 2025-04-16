import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) private taskRepo: Repository<Task>) {}

  async createTask(title: string, description: string, userId: string) {
    try {
      const task = this.taskRepo.create({
        title,
        description,
        user: { id: userId },
      });
      return await this.taskRepo.save(task);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create task');
    }
  }

  async getAllTasks() {
    try {
      return await this.taskRepo.find({ relations: ['user'] });
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch tasks');
    }
  }

  async getTaskById(id: string) {
    try {
      const task = await this.taskRepo.findOne({
        where: { id },
        relations: ['user'],
      });

      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
      return task;
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving task');
    }
  }

  async updateTask(id: string, updateData: Partial<Task>) {
    try {
      const task = await this.getTaskById(id);
      Object.assign(task, updateData);
      return await this.taskRepo.save(task);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update task');
    }
  }

  async deleteTask(id: string) {
    try {
      const task = await this.getTaskById(id);
      await this.taskRepo.remove(task);
      return { message: `Task with ID ${id} deleted successfully` };
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete task');
    }
  }
}
