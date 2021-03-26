import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent implements OnInit {

  UserCredintials= new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    user: new FormControl(),
    password: new FormControl()
  });

  constructor(public router: Router ) { }

  ngOnInit(): void {
  }

  saveInSession(){
    let user1:string= this.UserCredintials.get("user")?.value;
    let pass1:string= this.UserCredintials.get("password")?.value;

    sessionStorage.setItem("user", user1);
    sessionStorage.setItem("password", pass1);
    this.router.navigate(["login"]);
  }

  resetSession(){
    console.log("Welcome from resetSession");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("password");

    (<HTMLInputElement>document.getElementById("fname")).value="";
    (<HTMLInputElement>document.getElementById("lname")).value="";
    (<HTMLInputElement>document.getElementById("us")).value="";
    (<HTMLInputElement>document.getElementById("pass")).value="";
  }

}
