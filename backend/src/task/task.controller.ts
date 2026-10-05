import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';


import { TaskService } from './task.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  createTask(
    @Body() taskData: CreateTaskDto,
    @Req() request: any,
  ) {
    const userId = request.user.sub;

    return this.taskService.createTask({
      ...taskData,
      userId,
    });
  }

  @Delete(':id')
  deleteTask(
    @Req() request: any,
    @Param('id') id: string,
  ) {
    const userId = request.user.sub;

    return this.taskService.deleteTask(id, userId);
  }



@Get(':id')
getTaskById(
  @Param('id') id: string,
  @Req() request: any,
) {
  const userId = request.user.sub;

  return this.taskService.getTaskById(id, userId);
}

@Patch(':id')
updateTask(
  @Param('id') id: string,
  @Body() taskData: UpdateTaskDto,
  @Req() request: any,
) {
  const userId = request.user.sub;

  return this.taskService.updateTask(
    id,
    userId,
    taskData,
  );
}

@Get()
filterTask(
  @Req() request: any,
  @Query('status') status?: string,
  @Query('priority') priority?: string,
  @Query('search') search?:string,
) {
  const userId = request.user.sub;

  return this.taskService.filterTask(
    userId,
    status,
    priority,
    search,
  );
}
}