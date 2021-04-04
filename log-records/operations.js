let library= require("readline-sync");
let fs= require("fs");

class DataOperations{
    curr= {};
    recordArray= new Array();
   
    addNewRecord(path){
        let fname= library.question("Enter First Name: ");
        let lname= library.question("Enter Last Name: ");
        let gender= library.question("Eter your Gender: ");
        let email= library.question("Enter your Email: ");
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        this.curr.firstname= fname;
        this.curr.lastname= lname;
        this.curr.gender= gender;
        this.curr.email= email;
        this.curr.date= date;
        this.curr.time= time;

        try {
            if (fs.existsSync(path)) {
                var data= fs.readFileSync(path).toString();
                this.recordArray= JSON.parse(data);   
            }
        } finally{
            this.recordArray.push(this.curr);
            fs.writeFileSync(path, JSON.stringify(this.recordArray));
        }
    }
}

module.exports= {DataOperations};