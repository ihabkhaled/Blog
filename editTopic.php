<?php

$id = $_POST['id'];
$title = $_POST['title'];
$content = $_POST['content'];

require_once 'config.php';

$content = str_replace(array("'","\\\'"), "&#8242;", $content);
$title = str_replace(array("'","\\\'"), "&#8242;", $title);

$sql3 = "update posts set Title='$title',Content='$content' where id = '$id'";

if ($conn->query($sql3) === TRUE) {
    echo "Values Updated successfully";
}
else
{echo "Update Error";}
