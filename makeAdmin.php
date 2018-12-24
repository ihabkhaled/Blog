<?php
$id = $_POST['id'];
$admin = $_POST['admin'];

require_once 'config.php';

if($admin == "false") {
    $sql3 = "update users set Type='admin' where id = '$id'";
//mysqli_query($conn, $sql3);
    if ($conn->query($sql3) === TRUE) {
        echo "Admin";
    }
}

else
{
    $sql3 = "update users set Type='' where id = '$id'";
//mysqli_query($conn, $sql3);
    if ($conn->query($sql3) === TRUE) {
        echo "User";
    }
}

