import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  //contactDetails:Array<any>= [];
  username:any= sessionStorage.getItem("user");


  constructor() { }

  ngOnInit(): void {
  }

  saveRecord(contactRef:any){
    let name:string= contactRef.name;
    let phoneNum:string= contactRef.phone;

    //adding values to table
    let table: HTMLTableElement = <HTMLTableElement> document.getElementById("contactTable");
    let tableBody:any= table.getElementsByTagName("tbody")[0];
    let newRow:any = table.insertRow(tableBody.length);
    let cell1:HTMLTableElement= newRow.insertCell(0);                  //cell created
    cell1.innerHTML= name;                 //value place
    let cell2:HTMLTableElement= newRow.insertCell(1);                 //cell created
    cell2.innerHTML= phoneNum;                //value placed

    (<HTMLInputElement>document.getElementById("contName")).value="";
    (<HTMLInputElement>document.getElementById("phone")).value="";
  }
}
