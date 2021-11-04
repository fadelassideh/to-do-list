import { Injectable } from '@nestjs/common';
import { time } from 'console';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from 'src/entites/task.entities';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    private tasks:Task[] = [{id: 1, parent_id:0, title:"task1" , description:"this is descreption for task1", time:new Date()},
                            {id: 2, parent_id:0, title:"task2" , description:"this is descreption for task2", time:new Date()},
                            {id: 3, parent_id:0, title:"task3" , description:"this is descreption for task3", time:new Date()}];

    getTasks():Task[]{
        return this.tasks;
    }

    getTaskByID(id:number):Task{
        return this.tasks.find(task => task.id === id);
    }

    createTask(createTaskDto:CreateTaskDto):Task{
        if(!createTaskDto.parent_id){
            createTaskDto.parent_id = 0;
        }
        const newTask = {id:Date.now(), ...createTaskDto, time: new Date()};
        this.tasks.push(newTask);
        return newTask;
    }

    deleteTask(id:number):Task{
        const task = this.tasks.find(tsk =>tsk.id===id);
        const index = this.tasks.indexOf(task);
        this.tasks.splice(index,1);
        return task;
    }

    updateTask(id:number,updateTaskDto:UpdateTaskDto):Task{
        const index = this.tasks.indexOf(this.tasks.find(tsk =>tsk.id===id)) ;
        
        if(updateTaskDto.title){
            this.tasks[index].title = updateTaskDto.title;
        }
        if(updateTaskDto.description){
            this.tasks[index].description = updateTaskDto.description;
        }
        if(updateTaskDto.parent_id){
            this.tasks[index].parent_id = updateTaskDto.parent_id;
        }
        
        return this.tasks[index];
    }
}
