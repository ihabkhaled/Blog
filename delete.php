<?php
$id = $_POST['idNo'];

require_once 'config.php';

$sql3 = "delete from users where ID = '$id'";

//mysqli_query($conn, $sql3);
if ($conn->query($sql3) === TRUE) {
    echo "Values Deleted successfully";
}
else
{echo "Delete Error";}