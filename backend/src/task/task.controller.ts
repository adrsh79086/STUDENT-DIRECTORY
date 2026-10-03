import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import express from 'express';
import { Types } from 'mongoose';

import { TaskService } from './task.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createTask(
    @Body() taskData: CreateTaskDto,
    @Req() request: express.Request,
  ) {
    const userId = new Types.ObjectId(request['user'].sub);

    return this.taskService.createTask({
      ...taskData,
      userId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getTasks(@Req() request: express.Request) {
    const userId = request['user'].sub;

    return this.taskService.getUserTasks(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteTask(
    @Req() request: express.Request,
    @Param('id') id: string,
  ) {
    const userId = request['user'].sub;

    return this.taskService.deleteTask(id, userId);
  }



 @UseGuards(JwtAuthGuard)
@Get(':id')
getTaskById(
  @Param('id') id: string,
  @Req() request: express.Request,
) {
  const userId = request['user'].sub;

  return this.taskService.getTaskById(id, userId);
}
}