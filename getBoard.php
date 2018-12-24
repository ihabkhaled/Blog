<?php

require_once 'config.php';

$x = 0;

$sql3 = "select * from posts order by Date desc";

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
        $title = $row['Title'];
        $title = str_replace(array("\""), "&#8243;", $title);
        $title = str_replace(array("'","\\\'"), "&#8242;", $title);
        $title = str_replace(array("<"), "&lt;", $title);
        $title = str_replace(array(">"), "&gt;", $title);
        $title = str_replace(array("\r","\n"), "<br>", $title);
        $title = str_replace(array("\t"), " ", $title);
        $content = $row['Content'];
        $content = str_replace(array("\""), "&#8243;", $content);
        $content = str_replace(array("'","\\\'"), "&#8242;", $content);
        $content = str_replace(array("<"), "&lt;", $content);
        $content = str_replace(array(">"), "&gt;", $content);
        $content = str_replace(array("\r","\n"), "<br>", $content);
        $content = str_replace(array("\t"), " ", $content);
        $user = $row['User'];
        $comments = $row['Comments'];
        $likes = $row['Likes'];
        $dislikes = $row['Dislikes'];
        $date = $row['Date'];

        if ($x == $count - 1) {
            echo "{\"id\":\"$id\", \"Title\":\"$title\", \"Content\" : \"$content\",\"User\" : \"$user\",\"Comments\" : \"$comments\",\"Likes\" : \"$likes\",\"Dislikes\" : \"$dislikes\",\"Date\" : \"$date\" }";
        }
        else
        {
            echo "{\"id\":\"$id\", \"Title\":\"$title\", \"Content\" : \"$content\",\"User\" : \"$user\",\"Comments\" : \"$comments\",\"Likes\" : \"$likes\",\"Dislikes\" : \"$dislikes\",\"Date\" : \"$date\" },
            ";
        }
        $x++;
    }
    echo "]}";
}

$conn->close();