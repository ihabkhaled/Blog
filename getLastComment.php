<?php

require_once 'config.php';

$sql3 = "select * from comments order by id desc LIMIT 1 ";
$result = $conn->query($sql3);

if($result->num_rows === 0) {
    echo "not found";
}
else {
    $count = $result->num_rows;
    echo "{\"last\":[";
    while ($row = mysqli_fetch_array($result))
    {
        $id = $row['id'];
        echo "{\"id\":\"$id\" }";
    }
    echo "]}";
}

$conn->close();