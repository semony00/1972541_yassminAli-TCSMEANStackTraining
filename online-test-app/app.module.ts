import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { QuestionRetrieveComponent } from './question-retrieve/question-retrieve.component';
import { QuestionService } from './question.service';
import { FormsModule } from '@angular/forms';
import { GradeComponent } from './grade/grade.component';
import { AppRoutingModule } from './app-routing.module';
import { StartComponent } from './start/start.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionRetrieveComponent,
    GradeComponent,
    StartComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule, AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
