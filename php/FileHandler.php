<?php 
    if(isset($_POST['ajax'])){
        //print_r($_POST);
        print_r($_FILES);
    }
    
    //!!!DO NOT FORGET TO CHANGE THIS URL FOR YOUR NEEDS!!!
    $path = "../uploads/";

    $fileToBeUploaded = $path . basename($_FILES['file']['name']);
    
    if (move_uploaded_file($_FILES['file']['tmp_name'], $fileToBeUploaded))
    {
        echo "File succesfully uploaded.";
    } else {
        echo "Error while uploading file!";
    }

?>