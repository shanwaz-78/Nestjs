import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('/add-task')
  async create(@Body() createTaskDto: CreateTaskDto) {
    try {
      return await this.taskService.createTask(
        createTaskDto.title,
        createTaskDto.description,
        createTaskDto.userId,
      );
    } catch (error) {
      throw new InternalServerErrorException('Failed to create task');
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.taskService.getAllTasks();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve tasks');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!id) throw new BadRequestException('Task ID is required');
    try {
      return await this.taskService.getTaskById(id);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to retrieve task');
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    if (!id) throw new BadRequestException('Task ID is required');
    try {
      return await this.taskService.updateTask(id, updateTaskDto);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to update task');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (!id) throw new BadRequestException('Task ID is required');
    try {
      return await this.taskService.deleteTask(id);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to delete task');
    }
  }
}
