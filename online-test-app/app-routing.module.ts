import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradeComponent } from './grade/grade.component';
import { QuestionRetrieveComponent } from './question-retrieve/question-retrieve.component';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './start/start.component';


const routes: Routes=[
  {path: "\question-retrieve", component: QuestionRetrieveComponent},
  {path: "\grade", component: GradeComponent},
  {path: "\start", component: StartComponent},
  {path:"", redirectTo:"\start", pathMatch: "full"}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
