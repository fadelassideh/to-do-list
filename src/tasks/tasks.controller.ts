import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { Task } from 'src/entites/task.entities';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService:TasksService){}
    @Get()
    getTasks():Task[]{
        return this.tasksService.getTasks();
    }

    @Get(':id')
    getTaskById(@Param('id')id:string):Task {
        return this.tasksService.getTaskByID(Number(id));
    }

    @Post()
    createTask(@Body()createTaskDto:CreateTaskDto):Task{
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete(':id')
    deleteTask(@Param('id')id:string):Task{
        return this.tasksService.deleteTask(Number(id));
    }
    
    @Post(':id')
    updateTask(@Param('id')id:string, @Body()updateTaskDto:UpdateTaskDto):Task{
        return this.tasksService.updateTask(Number(id),updateTaskDto);
    }
}