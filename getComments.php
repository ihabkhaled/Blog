<?php

require_once 'config.php';

$x = 0;
$sql3 = "select * from comments order by Date asc ";
$result = $conn->query($sql3);

if($result->num_rows === 0) {
    echo "not found";
}
else {
    $count = $result->num_rows;
    $x = 0;
    //$data = "";
    echo "{\"data\":[";
    while ($row = mysqli_fetch_array($result))
    {
        $id = $row['id'];
        $user = $row['User'];
        $content = $row['Comment'];
        $content = str_replace(array("\""), "&#8243;", $content);
        $content = str_replace(array("'","\\\'"), "&#8242;", $content);
        $content = str_replace(array("<"), "&lt;", $content);
        $content = str_replace(array(">"), "&gt;", $content);
        $content = str_replace(array("\r","\n"), "<br>", $content);
        $content = str_replace(array("\t"), " ", $content);
        $date = $row['Date'];
        $pid = $row['p_id'];

        if ($x == $count - 1) {
            echo "{\"id\":\"$id\", \"Comment\" : \"$content\",\"User\" : \"$user\",\"Date\" : \"$date\",\"Pid\" : \"$pid\" }";}
        else {
            echo "{\"id\":\"$id\", \"Comment\" : \"$content\",\"User\" : \"$user\",\"Date\" : \"$date\",\"Pid\" : \"$pid\" },";}
        $x++;
    }
    echo "]}";
}

$conn->close();