<?php
 $userr = $_POST['user'];
 $avail = $_POST['avail'];
echo $userr;
require_once 'config.php';

$sql3 = "update users set online='$avail' where username = '$userr'";

if ($conn->query($sql3) === TRUE) {
    //echo "Values Inserted successfully";
}
else
{//echo "Insertion Error";
    }