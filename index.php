<?php 

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <script type="text/javascript" src="js/functions.js"></script>

    <!-- For grid -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <title>Multiple File Upload</title>
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="col-2">
                <label for="fileInput">Choose File</label>
            </div>
            <div class="col-3">
                <input type="file" id="fileInput" multiple onchange="onChangeFired()">
            </div>
        </div>
        <div id="fileList">

        </div>
    </div>
</body>
</html>