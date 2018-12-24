<?php
 $userr = $_POST['user'];
 $passs = $_POST['pass'];
 $emaill = $_POST['email'];
 $namee = $_POST['name'];

require_once 'config.php';

$sql3 = "insert into users (Username,Password,Fullname,email) values ('$userr','$passs','$namee','$emaill')";

//mysqli_query($conn, $sql3);
if ($conn->query($sql3) === TRUE) {
    echo "Values Inserted successfully";
}
else
{echo "Insertion Error";}