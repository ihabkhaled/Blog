<?php
$userr = $_POST['user'];
$title = $_POST['title'];
$content = $_POST['content'];

require_once 'config.php';

$content = str_replace(array("'","\\\'"), "&#8242;", $content);
$title = str_replace(array("'","\\\'"), "&#8242;", $title);

$sql3 = "insert into posts (Title,Content,User) values ('$title','$content','$userr')";

if ($conn->query($sql3) === TRUE) {
    echo "Values Inserted successfully";
}
else
{echo "Insertion Error";}