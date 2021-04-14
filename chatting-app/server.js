let app= require("express")();
let http= require("http").Server(app);
let io= require("socket.io")(http);

app.get("/", (req, res)=> {
    res.sendFile(__dirname+"/client.html");
})

io.on("connection", (socket)=> {
    console.log("Client connected to server...");

    socket.on("data", (input)=> {
        console.log(input.usr + ":  " + input.msg);
    })  
})

http.listen(8090, ()=>console.log("Server running on port 8090"));