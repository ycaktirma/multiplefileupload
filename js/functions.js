//Our FileList object for handling uploads.
//See for more: https://developer.mozilla.org/en-US/docs/Web/API/FileList

/*
    TODO: Delete function implement :) --> Done
*/

//_fileList is a FileList object
var _fileList;
//fileList is a object
var fileList;
/*
    Why are there two variables for the same task?
    Because FileList object is readonly but we want to change it in order to achieve delete functionality.
*/

//Function description: Get files then set to _fileList.
function addFile(){
    //Get FileList object
    _fileList = document.getElementById("fileInput").files;
    //Copy FileList into fresh new object.(The reason is explained above.)
    fileList = Object.assign({}, _fileList); // Issue!!!! -> Object.assign() doesn't copy 'length' property.So I use the readonly version below

    //Check _fileList if it is empty or not.
    if(_fileList.length !== 0){
        //If it is not empty, create html tags dynamically based on data we get.
        drawFileUploads();
    }
    else{
        console.log("Please choose a file.");
    } 

    //Disable the input to prevent some bugs for now.It should be improved but now it fits my needs.
    document.getElementById("fileInput").setAttribute("disabled","true");
}

//Function description: Draws selected files from file input.
function drawFileUploads(){

    const containerDiv = document.getElementById("fileList");

    if( _fileList.length !== 0 ){
        for(let i=0; i<_fileList.length; i++){
            /*
                Begin creating element.
                This all process is about creating a html elements with two texts and two buttons.
            */
            const divRow = document.createElement("div");
            divRow.classList.add("row");
            divRow.id = "file_"+i;
        
            const divColFilename = document.createElement("div");
            const divColFilenameP = document.createElement("p");
            divColFilename.classList.add("col-2");
            divColFilenameP.innerHTML = fileList[i].name;
            divColFilename.appendChild(divColFilenameP);
        
            const divColFilestate = document.createElement("div");
            const divColFilestateP = document.createElement("p");
            divColFilestate.classList.add("col-3");
            divColFilestateP.innerHTML = "Not Uploaded";
            divColFilestateP.id = "fileState_"+i;
            divColFilestate.appendChild(divColFilestateP);
        
            const divColFilebuttons = document.createElement("div");
            const divColFiledelete = document.createElement("button");
            const divColFileupload = document.createElement("button");
            divColFilebuttons.classList.add("col-3");

            //Attach event to the buttons
            divColFilebuttons.onclick = function(e){
                let targetId = e.target.id; // id is sth like this: btnDelete_0 or btnUpload_1
                idPrefix = targetId.split("_",2)[0];
                idNumber = targetId.split("_",2)[1];
                //Button delete events
                if( idPrefix === "btnDelete"){ // If we click on the delete button
                    //Take just the number
                    deleteFile(idNumber);

                }
                //Button upload events
                if( idPrefix === "btnUpload"){ //If we click on the delete button
                    uploadFile(idNumber);
                }


            }
            divColFiledelete.innerHTML = "Delete";
            divColFileupload.innerHTML = "Upload";
            divColFiledelete.id = "btnDelete_"+i;
            divColFileupload.id = "btnUpload_"+i;
            divColFilebuttons.appendChild(divColFiledelete);
            divColFilebuttons.appendChild(divColFileupload);
        
            divRow.appendChild(divColFilename);
            divRow.appendChild(divColFilestate);
            divRow.appendChild(divColFilebuttons);
        
            containerDiv.appendChild(divRow);
            /*End creating element*/

        }
    }


}

function deleteFile(id){
    //Delete from data object
    delete fileList[id];

    //Delete the visual of element
    let willBeDeleted = document.getElementById("file_"+id);
    document.getElementById("fileList").removeChild(willBeDeleted);

    //Test code(Delete it later)
    LogFileList();
}

function uploadFile(id){
    //Preparing data we'll send
    var formData = new FormData();
    formData.append("ajax","ajaxreq");
    formData.append("file", fileList[id]);

    //Create ajax request
    var xhttp = new XMLHttpRequest();

    //Update text and buttons as the state changes. 
    xhttp.onreadystatechange = function(){
        uploadState(xhttp.readyState,id);
    };

    //Send the request. !!!DO NOT FORGET TO CHANGE THIS URL FOR YOUR NEEDS!!!
    xhttp.open("POST","php/FileHandler.php");
    xhttp.send(formData);
}

//Apply changes to ui elements with given id.
function uploadState(xhrstate,id){
    if(xhrstate !== 4){ // 4 means done
        document.getElementById("fileState_"+id).innerHTML = "Uploading";
    }
    else{
        document.getElementById("fileState_"+id).innerHTML = "Uploaded";
        document.getElementById("btnDelete_"+id).setAttribute("disabled","true");
        document.getElementById("btnUpload_"+id).setAttribute("disabled","true");
    }
}

//Test function
function LogFileList(){
    console.log(_fileList);
}

function onChangeFired(){
    addFile();
}
