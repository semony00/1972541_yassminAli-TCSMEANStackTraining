import { Component, OnInit } from '@angular/core';
import { Question } from '../question.model';
import { QuestionService } from '../question.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent implements OnInit {

  jsonRes=[];
  finalGrade:number= 0;

  constructor() { }

  ngOnInit(): void {
    this.showResult();
  }

  showResult(){
    let res:any=  sessionStorage.getItem("answers");
    this.jsonRes= JSON.parse(res);

    //console.log(jsonRes);

    for(let i= 0; i < this.jsonRes.length; i++){
      console.log(this.jsonRes[i][0] + ", " + this.jsonRes[i][1])
      if(this.jsonRes[i][0] == this.jsonRes[i][1] ){
        this.finalGrade+=12.5;
      }
    }
  }

}
