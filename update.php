<?php
 $userr = $_POST['user'];
 $passs = $_POST['pass'];
 $emaill = $_POST['email'];
 $namee = $_POST['name'];
 $id = $_POST['id'];

require_once 'config.php';

$sql3 = "update users set 
Username='$userr'
,Password='$passs'
,Fullname='$namee' 
,email='$emaill' where id = '$id'";

//mysqli_query($conn, $sql3);
if ($conn->query($sql3) === TRUE) {
    echo "Values Updated successfully";
}
else
{echo "Update Error";}


