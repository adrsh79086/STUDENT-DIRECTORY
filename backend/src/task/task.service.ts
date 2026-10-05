import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Task, TaskDocument } from './schema/task.schema';
import { UpdateTaskDto } from './dto/update-task.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<TaskDocument>,
  ) {}

  // Create Task
  async createTask(taskData: Partial<Task>) {
    const task = new this.taskModel({
      ...taskData,
      task_uuid : uuidv4()
    });

    return task.save();
  }

  // Get tasks of logged-in user
  async getUserTasks(userId: string) {
    return this.taskModel.find({
      userId: userId,
    });
  }

  // Delete Task
  async deleteTask(task_uuid: string, userId: string) {
    return this.taskModel.findOneAndDelete({
      task_uuid:task_uuid,
      userId: userId,
    });
  }

  // Get Task By ID
  async getTaskById(task_uuid:string, userId: string) {
    const task = await this.taskModel.findOne({
       task_uuid: task_uuid,
      userId: userId,
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  // Update Task
  async updateTask(
  task_uuid: string,
    userId: string,
    taskData: UpdateTaskDto,
  ) {
    const task = await this.taskModel.findOneAndUpdate(
      {
      task_uuid: task_uuid,
        userId: userId,
      },
      taskData,
      { new: true },
    );

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  // Filter Tasks
  async filterTask(
    userId: string,
    status?: string,
    priority?: string,
    search?: string,
  ) {
    const filter: any = {
      userId: userId,
    };

    if (status) {
      filter.status = status;
    }

    if (priority) {
      filter.priority = priority;
    }

    if (search) {
      filter.title = {
        $regex: search,
        $options: 'i',
      };
    }

    return this.taskModel.find(filter);
  }
}