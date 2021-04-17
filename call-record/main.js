let obj= require("./functions.js");


let data= obj.fetchData("call_data.json");
/*
for(var i=0; i < data.length; i++){
    console.log(data[i]._id);
}
*/
obj.insertData(data);



