import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from './task.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(public http:HttpClient) { }

  storeTask(tsk:any){
    this.http.post("http://localhost:3000/task/", tsk)
    .subscribe(result=>console.log(result), error=>console.log(error));

    this.getTask();
  }

  getTask():Observable<Task[]>{
    return this.http.get<Task[]>("http://localhost:3000/task/");
  }
}
