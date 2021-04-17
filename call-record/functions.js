
let fs= require("fs");
var mongoClient = require('mongodb').MongoClient;


fetchData= function getData(file){
    let dataArray= new Array();
    try{
        if(fs.existsSync(file)){
            var data= fs.readFileSync(file).toString();
            dataArray= JSON.parse(data);
        }
    }catch(error){
        
    }
    return dataArray;
}

insertData= function insertD(data){
    let url= "mongodb://localhost:27017";
    
    mongoClient.connect(url, {useUnifiedTopology: true}, (err1, client)=> {
        
        if(!err1){
            let db= client.db("meanStack");
            for(let i= 0; i < data.length; i++){
                db.collection("callData").insertOne({_id:data[i]._id, source: data[i].source, 
                destination: data[i].destination, destinationLocation:data[i].destinationLocation, 
                callDuration:data[i].callDuration, roaming:data[i].roaming, callCharge:data[i].callCharge})
            }
            console.log("Data inserted successfully to the database!!")
        }
        //client.close();
    });
}

module.exports= {fetchData, insertData};