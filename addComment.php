<?php
$userr = $_POST['user'];
$pid = $_POST['pid'];
$comment = $_POST['comment'];

require_once 'config.php';

$comment = str_replace(array("'","\\\'"), "&#8242;", $comment);

$sql3 = "insert into comments (p_id,Comment,User) values ('$pid','$comment','$userr')";

if ($conn->query($sql3) === TRUE) {
    echo "Values Inserted successfully";
    $id = $pid;
    $sql = "update posts set Date=CURRENT_TIMESTAMP where id = '$id'";
    $conn->query($sql);
}
else
{echo "Insertion Error";}