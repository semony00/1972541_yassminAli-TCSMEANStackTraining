let app= require("express")();
let bodyParser= require("body-parser");
let obj= require("mongoose");
let port= 6050;
let url= "mongodb://localhost:27017/meanStack";

const mongooseDbOptions= {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
let CourseSchema= obj.Schema({
    _id:Number,
    courseName:String,
    description:String,
    amount:Number
});

//connecting to data base
obj.connect(url, mongooseDbOptions);
let db= obj.connection;
db.on("error", (err)=>console.log(err));
db.on("open", ()=>{
    console.log("opened")
        
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get("/", (req,res)=>{
    let path= require("path");
    res.sendFile(__dirname+"/index.html");
});

app.get("/add", (req,res)=>{
    res.sendFile(__dirname+"/addPage.html");
});

app.post("/addCourse", (req,res)=>{
    let id= req.body.id;
    let cName= req.body.cName;
    let desc= req.body.description;
    let amnt= req.body.amount;

    //creating new record and adding it to database
    let Course= obj.model("", CourseSchema, "CoursesTable");
        let c1= new Course({_id:id, courseName:cName, description:desc, amount:amnt});
        c1.save((err,result)=>{
            if(!err){
                res.send("course is added successfully");
            }else{
                res.send(err);
            }
    });
});


app.get("/delete", (req,res)=>{
    res.sendFile(__dirname+"/deletePage.html");
});

app.post("/deleteCourse", (req, res)=> {
    let cId= eval(req.body.id);

    let course= obj.model("", CourseSchema, "CoursesTable" );
    course.deleteMany({_id:cId}, (err, result)=> {
        if(!err){
            if(result.deletedCount > 0){
                res.send("Record deleted");
            }else{
                res.send("Record is not present");
            }
        }else{
            res.send(err);
        }
    })
})

app.get("/update", (req,res)=> {
    res.sendFile(__dirname+"/updatePage.html");
});

app.post("/updateCourse", (req, res)=> {
    let cId= req.body.id;
    let newAmount= req.body.amount;

    let course= obj.model("", CourseSchema, "CoursesTable");
    course.updateMany({_id:cId}, {$set:{amount:newAmount}}, (err,result)=> {
        if(!err){
            if(result.nModified > 0){
                res.send("Record Updates");
            }else{
                res.send("record did not update");
            }
        }else{
            res.send(err);
        }
    });
});

app.get("/display", (req,res)=>{
    let course= obj.model("", CourseSchema, "CoursesTable");
    let tableHTML= `<table border="1px">
    <thead border="1px">
        <tr border="1px">
            <th>Course ID</th>
            <th>Course Name</th>
            <th>Description</th>
            <th>Amount</th>
        </tr>
    </thead>
    <tbody>`;

    course.find({}, (err, result)=> {
        if(!err){

            for(let i= 0; i < result.length; i++){
                tableHTML+= 
                `<tr border="1px">
                    <td>${result[i]._id}</td>
                    <td>${result[i].courseName}</td>
                    <td>${result[i].description}</td>
                    <td>${result[i].amount}</td>
                </tr>`
            }

            tableHTML+=`</tbody>
            </table>`;
            
            res.send(tableHTML);
        }
    });
});
    
app.listen(port, ()=>console.log(`server is running on port number ${port}`));