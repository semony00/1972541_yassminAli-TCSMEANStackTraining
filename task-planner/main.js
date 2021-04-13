let http= require("http");
let url= require("url");
let port= 9090;
let obj= require("./functions.js");
let fs= require("fs");

let loginHTML= `
<h2>Add Task</h2>
<form action= "/login" method="get"> 
    <label>Employee ID:</label>  
    <input type="text" name="empid"/>
    <br/><br/>

    <label>Task ID: </label>
    <input type="text" name="taskid" value=""/>
    <br/><br/>
              
    <label>Task: </label>
    <textarea name="task"></textarea>  
    <br/><br/>
        
    <label>Dead Line: </label>
    <input type= "date" name="deadline" value= "2021-04-01" min="2021-04-01" max="2021-12-31"/>
    <br/><br/> 
    <input type="submit" value= "Add Task">
</form> 

<br/><br/>
<hr/>

<h2>Delete Task</h2>
<form action= "/delete" method="GET">
    <label>Task ID:  </label>
    <input type="text" name="taskid"/>
    <input type="submit" value= "Delete Task">
</form>

<br/><br/>

<a href="/display" class="button">Display Tasks</a>
`

let path= "./tasksDB.json"
let tskObj= new obj.TaskClass();


let server= http.createServer((req, res)=> {
    var pathname= url.parse(req.url, true).pathname;
    console.log(pathname);

    if(pathname == "/favicon.ico" || pathname == "/" ){
        res.setHeader("content-type", "text/html");
        res.end(loginHTML);
    }

    else if(pathname == "/login"){
        let input= url.parse(req.url, true).query;
        let taskArray= tskObj.saveToJson(input, path);
        res.write(JSON.stringify(taskArray[0]) + "\n");
        res.end("Task sccessfully added...");
    }

    else if(pathname == "/delete"){
        let data= url.parse(req.url, true).query;
        let reqTaskId= data.taskid;
        let result= tskObj.deleteTask(reqTaskId, path); 
        res.end(result);
    }

    else if(pathname == "/display"){

    let tableHTML=`<table border="2px">
        <thead border="1px">
            <tr border="1px">
                <th>employee ID</th>
                <th>task ID</th>
                <th>Task</th>
                <th>Deadline</th>
            </tr>
        </thead>
        <tbody>
    `
        var data= fs.readFileSync(path).toString();
        let taskArray= JSON.parse(data);

        for(var i= 0; i < taskArray.length; i++){
            tableHTML+= `<tr border="1px">
                <td>${taskArray[i].empid}</td>
                <td>${taskArray[i].taskid}</td>
                <td>${taskArray[i].task}</td>2
                <td>${taskArray[i].deadline}</td>
            </tr>
          `
        }
        tableHTML+=`</tbody>
                    </table>`
        
        res.write(tableHTML);
        res.end();
    }
})

server.listen(port, console.log("listening on port " + port));
