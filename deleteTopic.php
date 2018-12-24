<?php
$id = $_POST['id'];

require_once 'config.php';

$sql3 = "delete from posts where id = '$id'";

if ($conn->query($sql3) === TRUE) {
    echo "Values Deleted successfully";
}
else
{echo "Error";}