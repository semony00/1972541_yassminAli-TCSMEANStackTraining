let app= require("express")();
let http= require("http").Server(app);
let io= require("socket.io")(http);
let obj= require("mongoose");
obj.Promise= global.Promise;
let url= "mongodb://localhost:27017/meanStack";

let port= 7050;
let id= 1;

const mongooseDbOptions= {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

let ChatSchema= obj.Schema({
    _id:Number,
    senderName:String,
    message:String
});

obj.connect(url, mongooseDbOptions);
let db= obj.connection;
db.on("error", (err)=> console.log(err));
db.on("open", ()=> {
    console.log("Database is opened");
});



app.get("/", (req,res)=> {
    res.sendFile(__dirname+"/index.html");
})

io.on("connection", (socket)=> {
    console.log("client is connected to application...");

    socket.on("insertData", (data)=> {
        let name= data.name;
        let msg= data.msg;
        console.log(name);
        console.log(msg);
        id++;

        let Chat= obj.model("", ChatSchema, "chatLog");
        let c1= new Chat({_id:id, sanderName:name, message:msg});
        c1.save((err,result)=> {
            if(!err){
                console.log("Chat info is saved successfully");
            }else{
                console.log("chat info is not saved");
            }
        });
    });
});

http.listen(port, ()=>console.log(`server running on port number ${port}`));