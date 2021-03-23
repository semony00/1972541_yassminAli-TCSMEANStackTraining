class ItemClass {
    name:string; 
    price:string;
}

let ItemsList:ItemClass[]= [];

function addToCart(selectedItem:number){
    readData(selectedItem);
    storeInSession();
}

function storeInSession(): void{
    let itemString= JSON.stringify(ItemsList);
    sessionStorage.setItem("itemInfo", itemString);
    console.log(itemString);
}

function readData(selectedItem:number){

    let itemObj: ItemClass= new ItemClass();
    if(selectedItem == 1){
        itemObj.name= document.getElementById("laptop").innerHTML;
        itemObj.price= document.getElementById("price1").innerHTML;
    }else if(selectedItem == 2){
        itemObj.name= document.getElementById("mobile").innerHTML;
        itemObj.price= document.getElementById("price2").innerHTML;
    }else if(selectedItem == 3){
        itemObj.name= document.getElementById("perfume").innerHTML;
        itemObj.price= document.getElementById("price3").innerHTML;
    }else if(selectedItem == 4){
        itemObj.name= document.getElementById("helmet").innerHTML;
        itemObj.price= document.getElementById("price4").innerHTML;
    }else if(selectedItem == 5){
        itemObj.name= document.getElementById("camera").innerHTML;
        itemObj.price= document.getElementById("price5").innerHTML;
    }else if(selectedItem == 6){
        itemObj.name= document.getElementById("bookcase").innerHTML;
        itemObj.price= document.getElementById("price6").innerHTML;
    }

    ItemsList.push(itemObj);
    console.log(ItemsList);
}

function retrieveFromSession():any{
    var strObj: string= sessionStorage.getItem("itemInfo");
    var jsonObj: any= JSON.parse(strObj);
    console.log(jsonObj);
    
    //window.addEventListener("beforeunload", function() { debugger; }, false)
    return jsonObj;
}

function  insertRecordInTable(){ 
    var data:any= retrieveFromSession();
    console.log(data);

    
    //let table: any= document.getElementById("itemsTable");
    var table: HTMLTableElement = <HTMLTableElement> document.getElementById("itemsTable");
    let tableBody:any= table.getElementsByTagName("tbody")[0];

    
    
    let total: any= 0;
    for(var i= 0; i < data.length; i++){
        var newRow:any = table.insertRow(tableBody.length);
        //let newRow:any= tableBody.insertRow(0); //row created
        let cell1:HTMLTableElement= newRow.insertCell(0);                  //cell created
        cell1.innerHTML= data[i]["name"];                 //value place

        var cell2:HTMLTableElement= newRow.insertCell(1);                 //cell created
        cell2.innerHTML= data[i]["price"];                //value placed

        total+= eval(data[i]["price"]);
    }
    
    document.getElementById("total").innerHTML= total;
    
    //var cell3= newRow.insertCell(2);                 //cell created
    //cell3.innerHTML= total; 
}