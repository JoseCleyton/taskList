import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskList } from '../model/taskList-model';
import { Task } from '../model/task-model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private htpp: HttpClient) { }


  public findAll():Observable<TaskList[]>{
    return this.htpp.get<TaskList[]>('http://localhost:8080/taskList')
  }
  public addtask(task: Task):Observable<Task>{
    return this.htpp.post<Task>(`http://localhost:8080/task/${task.taskList.id}`, {
      title: task.title,
      description: task.description
    })
  }
  public createNewTaskList(taskList: TaskList):Observable<TaskList>{
    return this.htpp.post<TaskList>('http://localhost:8080/taskList', {
      title: taskList.title,
      description: taskList.description
    })
  }
  public doneTask(task: Task):Observable<Task>{
    return this.htpp.put<Task>(`http://localhost:8080/task/${task.id}`, {
      title: task.title,
      description: task.description
    })
  }
  public deleteTask(task: Task):Observable<Task>{
    return this.htpp.delete<Task>(`http://localhost:8080/task/${task.id}`);
  }
}
