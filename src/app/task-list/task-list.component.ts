import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { TaskList } from '../model/taskList-model';
import { Task } from '../model/task-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  public taskList: TaskList[] = [];
  public taskL: TaskList = null;
  public task: Task;
  public formAddTask: FormGroup;
  public formNewTaskList: FormGroup;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {

    this.formAddTask = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required])
    })

    this.formNewTaskList = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required])
    })

    this.taskService.findAll().subscribe(
      (data: TaskList[]) => this.taskList = data
    )
  }

  public selectTaskList(id: number) {
    this.taskL = this.taskList.find((t) => {
      return t.id === id
    })

  }
  public selectTaskToDone(id: number) {
    this.taskList.find((tl) => {
      tl.tasks.find((t) => {
        if (t.id === id) {
          this.task = t
        }
      })
    })
  }

  public doneTask() {
    this.task.done = true
    this.taskService.doneTask(this.task).subscribe(
      (data) => {
        this.taskService.findAll().subscribe(
          (data: TaskList[]) => {
            this.taskList = data;
          }
        )
      }
    )
  }

  public selectTaskToDelete(id: number) {
    this.taskList.find((tl) => {
      tl.tasks.find((t) => {
        if (t.id === id) {
          this.task = t
        }
      })
    })
  }

  public deleteTask() {
    this.taskService.deleteTask(this.task).subscribe(
      () => {
        this.taskService.findAll().subscribe(
          (data: TaskList[]) => {
            this.taskList = data
          }
        )
      }
    )
  }

  public addTask() {
    let task = new Task(this.formAddTask.value.title, this.formAddTask.value.description);
    task.taskList = this.taskL;
    this.taskService.addtask(task).subscribe(
      (data) => {
        this.taskService.findAll().subscribe(
          (data: any[]) => {
            this.taskList = data
            this.resetForm();
          }

        )
      }
    )
  }
  public createTaskList() {
    let tasklist = new TaskList(this.formNewTaskList.value.title, this.formNewTaskList.value.description);
    this.taskService.createNewTaskList(tasklist).subscribe(
      (data) => {
        this.taskService.findAll().subscribe(
          (data: any[]) => {
            this.taskList = data;
            this.resetForm();
          }
        )
      }
    )
  }

  public resetForm() {
    this.formAddTask.reset();
    this.formNewTaskList.reset();
  }

}
