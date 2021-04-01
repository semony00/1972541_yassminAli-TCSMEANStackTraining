import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task.model';

@Component({
  selector: 'app-get-task',
  templateUrl: './get-task.component.html',
  styleUrls: ['./get-task.component.css']
})
export class GetTaskComponent implements OnInit {

  taskList:Array<Task>= [];

  constructor(public taskServ: TaskService) { }

  ngOnInit(): void {
    console.log(this.taskServ.getTask().subscribe(result=>this.taskList=result));
  }

  storeTask(userInput:any){
    this.taskServ.storeTask(userInput);
    //this.retrieveTasks()
  }
  /*
  retrieveTasks(){
    console.log(this.taskList.length)
    this.taskServ.getTask().subscribe(result=>this.taskList=result);
    console.log(this.taskList.length)
  }
  */

}
