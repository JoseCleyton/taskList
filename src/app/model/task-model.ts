import { TaskList } from './taskList-model';

export class Task {
    public id: number;
    public taskList: TaskList;
    public done: boolean = false;
    constructor(public title: string, public description: string) { }
}