import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  

  constructor(public router: Router) { }
 
  ngOnInit(): void {
  }

  checkUser(userInfo:any){
    //this is what the user input in the form
    let userName:string= userInfo.user;
    let passInput:string= userInfo.pass;
    //here we should compare to the info in the session

    if(sessionStorage.length != 0){
      //let userInputs= sessionStorage.getItem("userInformation");

      //this is the registered user we have in the session
      let currPass= sessionStorage.getItem("password" );
      let currUserName= sessionStorage.getItem("user");
      

      if(userName == currUserName && passInput == currPass){
        console.log("Success!");
        this.router.navigate(["portfolio"]);
      }else{
        console.log("Failure! invalid credintials!" + passInput + " " + currPass);

        this.router.navigate(["login"]);

        let para= document.createElement('p');
        para.innerHTML= "Invalid credintials!";
        document.getElementById("loginForm")?.appendChild(para);
      }

    }else{
      console.log("Failure! Register first!");
      
      this.router.navigate(["login"]);

      let para= document.createElement('p');
      para.innerHTML= "No Account Found...Please Sign Up!";
      document.getElementById("loginForm")?.appendChild(para);
      
    }
  }

  /*
  reset(){
    this.userName="";
    this.passInput= "";
  }*/

}
