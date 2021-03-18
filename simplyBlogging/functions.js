function addBlog(){
    storeInSession();
    insertNewBlog();
    reset()
}

function storeInSession(){
    var obj= readData();
    var blogString= JSON.stringify(obj);
    sessionStorage.setItem("blogInfo", blogString);
    console.log(obj);
}

function readData(){
    var blogObj= {};

    blogObj.title= document.getElementById("title").value;
    blogObj.article= document.getElementById("article").value;
    blogObj.i= document.getElementById("image").files[0].name;

    return blogObj;
}

function retrieveFromSession(){
    var strObj= sessionStorage.getItem("blogInfo");
    var jsonObj= JSON.parse(strObj);
    return jsonObj;
}

function insertNewBlog(){
    var jsObj= retrieveFromSession();
    console.log(typeof(jsObj));

    var divRow = document.createElement("div");
    divRow.class= "row";

    //var divCol = document.createElement("div");
    //divCol.class= "col-4";

    document.getElementById("mainDiv").appendChild(divRow);
    //divRow.appendChild(divCol);
    //document.getElementById("mainDiv").appendChild(divRow);

    var imageElement= document.createElement("img");
    imageElement.class= "col-2";
    var titleElment = document.createElement("div");
    titleElment.class= "col-2";
    var articleElment = document.createElement("div");
    titleElment.class= "col-2";


    imageElement.src= jsObj.i;
    titleElment.innerHTML= jsObj.title;
    articleElment.innerHTML= jsObj.article;

    brElem= document.createElement("br");
    
    divRow.appendChild(imageElement);
    divRow.appendChild(titleElment);
    divRow.appendChild(articleElment);

    /*
    document.getElementById("mainDiv").appendChild(imageElement);
    document.getElementById("mainDiv").appendChild(titleElment);
    document.getElementById("mainDiv").appendChild(articleElment);
    document.getElementById("mainDiv").appendChild(brElem);
    */

    document.getElementById("mainDiv").appendChild(brElem);
    document.getElementById("mainDiv").appendChild(brElem);
}

function reset(){
    document.getElementById("title").value= "";
    document.getElementById("article").value="";
    document.getElementById("image").files[0]="";
}