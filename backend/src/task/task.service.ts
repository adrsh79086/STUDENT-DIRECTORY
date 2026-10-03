import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Task, TaskDocument } from './schema/task.schema';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<TaskDocument>,
  ) {}

  // Create Task
  async createTask(taskData: Partial<Task>) {
    const task = new this.taskModel(taskData);
    return task.save();
  }

  // Get tasks of logged-in user
 async getUserTasks(userId: string) {
  return this.taskModel.find({
    userId: new Types.ObjectId(userId),
  });}

  async deleteTask(taskId: string, userId: string) {
  return this.taskModel.findOneAndDelete({
    _id: new Types.ObjectId(taskId),
    userId: new Types.ObjectId(userId),
  });
}
 
async getTaskById(id: string, userId: string) {
  const task = await this.taskModel.findOne({
    _id: new Types.ObjectId(id),
    userId: new Types.ObjectId(userId),
  });

  if (!task) {
    throw new NotFoundException('Task not found');
  }

  return task;
}

}