let fs= require("fs");


class TaskClass{
    saveToJson(input, path){ 
        let curr= {};
        let taskArray= new Array();

        curr.empid= input.empid;
        curr.taskid= input.taskid;
        curr.task= input.task;
        curr.deadline= input.deadline;

        try{
            if(fs.existsSync(path)){
                var data= fs.readFileSync(path).toString();
                taskArray= JSON.parse(data);
            }
        }finally{
            taskArray.push(curr);
            fs.writeFileSync(path, JSON.stringify(taskArray));
        }
        return taskArray;
    }
    
    deleteTask(taskID, path){
        var resultMsg= "";
        try{
            if(fs.existsSync(path)){
                var data= fs.readFileSync(path).toString();
                let taskArray= JSON.parse(data);

                for(var i= 0; i < taskArray.length; i++){
                    if(taskArray[i].taskid == taskID){
                        taskArray.splice(i, 1);
                        fs.writeFileSync(path, JSON.stringify(taskArray));
                        resultMsg= "Task is deleted";
                    }
                }
                if(resultMsg != "Task is deleted"){
                    resultMsg= "Task is not found";
                }
            }
        }catch(error){
            resultMsg= error;
        }
        return resultMsg;
    }
}

module.exports= {TaskClass};