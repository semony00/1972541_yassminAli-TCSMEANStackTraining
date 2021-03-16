//no script tag inside a js file should be used

var projObj= [];

function storeInSession(){
    onFormSubmit();
    var empString= JSON.stringify(projObj);
    sessionStorage.setItem("projInfo", empString);
    console.log(retrieveFromSession());
}

function retrieveFromSession(){
    var strObj= sessionStorage.getItem("projInfo");
    var jsonObj= JSON.parse(strObj);
    //console.log(jsonObj[0]["name"]);
    //console.log(jsonObj[0]["proj"]);
    //console.log(jsonObj[0]["budget"]);
    //console.log(jsonObj);
    return jsonObj;
}

function onFormSubmit(){
    //alert("Event Generated..");
    var data= readFromData();
    //insertNewRecord(data);
    projObj.push(data);   //store data in empObj
    resetData();
}

//read data directly from elements
function readFromData() {
    var obj= {};   //empty object which is a map 
    obj.name= document.getElementById("name").value;
    obj.proj= document.getElementById("proj").value;
    obj.budget= document.getElementById("budget").value;
    console.log(obj); 
    return obj;
}

function  insertNewRecord(){ 
    var data= retrieveFromSession();
    var table= document.getElementById("eventList");
    var tableBody= table.getElementsByTagName("tbody")[0];
    
    var total= 0;
    for(var i= 0; i < data.length; i++){
        var newRow= tableBody.insertRow(tableBody.length); //row created
        var cell1= newRow.insertCell(0);                  //cell created
        cell1.innerHTML= data[i]["name"];                 //value place

        var cell2= newRow.insertCell(1);                 //cell created
        cell2.innerHTML= data[i]["proj"];                //value placed

        var cell3= newRow.insertCell(2);                 //cell created
        cell3.innerHTML= data[i]["budget"];  
        total+= eval(data[i]["budget"]);
    }

    var cell4= newRow.insertCell(3);                 //cell created
    cell4.innerHTML= total;
}

function resetData(){
    document.getElementById("name").value= "";
    document.getElementById("proj").value="";
    document.getElementById("budget").value="";
}