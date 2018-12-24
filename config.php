<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ihab";

// Create connection
$conn = new mysqli($servername, $username, $password ,$dbname);

$sSQL= 'SET CHARACTER SET utf8';

mysqli_query($conn,$sSQL);