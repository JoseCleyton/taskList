import { Task } from './task-model';

export class TaskList {
    public id: number;
    public tasks: Task[] = [];
    constructor(public title: string, public description: string) { }
}