import { Component, OnInit } from '@angular/core';
import { Question } from '../question.model';
import { QuestionService } from '../question.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-retrieve',
  templateUrl: './question-retrieve.component.html',
  styleUrls: ['./question-retrieve.component.css']
})
export class QuestionRetrieveComponent implements OnInit {

  questions:Array<Question>= [];
  //this is an array of arrays. each inner array holds the user input at index 0, and the correct answer at index 1
  inputAnswers:Array<Array<string>>= [];

  ans:string="";
  index:number= -1;
  currIndex:number= -1;
  isVisible:any= "hidden";
  

  constructor(public quesServ:QuestionService, public router:Router) {}

  ngOnInit(): void {
    this.quesServ.getQuestions().subscribe(result=>this.questions=result);
  }

  loadQuestions(){
    this.index+=1;
    this.fun();    
  }

  fun(){
    this.ans="";
    if (this.index < this.questions.length){
      //writing content in html tags
      (<HTMLInputElement>document.getElementById("quest")).textContent= this.questions[this.index].quest;
      (<HTMLInputElement>document.getElementById("aLabel")).textContent= this.questions[this.index].a;
      (<HTMLInputElement>document.getElementById("bLabel")).textContent= this.questions[this.index].b;
      (<HTMLInputElement>document.getElementById("cLabel")).textContent= this.questions[this.index].c;
      (<HTMLInputElement>document.getElementById("dLabel")).textContent= this.questions[this.index].d;

      //controlling visibility of html tags
      (<HTMLInputElement>document.getElementById("inputDiv")).style.visibility = "visible";
      (<HTMLInputElement>document.getElementById("prompt")).style.visibility = "hidden";
      
    }else{ 
      //save answers in session and reroute 
      let finalAnswers= JSON.stringify(this.inputAnswers);
      sessionStorage.setItem("answers", finalAnswers);
      this.router.navigate(["grade"]);
    }
  }

  saveAnswer(userSelection:any, anserSelected:any){
    //let key:string= "";
    console.log("answer Selected is: " + anserSelected);

    if(this.currIndex != this.index){
    
      //saving user input and correct answer that is saved in questions array
      this.inputAnswers.push([userSelection, this.questions[this.index].answer, anserSelected, this.questions[this.index].answerText]);
      this.currIndex= this.index;
      /*
      for (let obj of this.questions) {
        for (let key in obj) {
          if(key == userSelection){
            this.inputAnswers[this.currIndex].push= obj[key];
          }
        }
      }*/
    }else{
      this.inputAnswers[this.currIndex][0]= userSelection;
      this.inputAnswers[this.currIndex][3]= anserSelected;
    }

    
  }
}
