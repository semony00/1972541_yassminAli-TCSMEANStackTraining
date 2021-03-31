import { Injectable } from '@angular/core';
import { Question } from './question.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(public http:HttpClient) { }

  getQuestions():Observable<Question[]> {

    return this.http.get<Question[]>("/assets/questions.json");
  }
}
