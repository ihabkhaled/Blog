<?php

require_once 'config.php';

$sqlUsers = "select COUNT(id) as c from users";
$result1 = $conn->query($sqlUsers);

$sqlPosts = "select COUNT(id) as c from posts";
$result2 = $conn->query($sqlPosts);

$sqlCmnts = "select COUNT(id) as c from comments";
$result3 = $conn->query($sqlCmnts);

if($result1->num_rows === 0 || $result2->num_rows === 0 || $result3->num_rows === 0) {
    echo "not found";
}
else {
    while ($row = mysqli_fetch_array($result1))
    {
        $result1 = $row['c'];
        break;
    }
    while ($row = mysqli_fetch_array($result2))
    {
        $result2 = $row['c'];
        break;
    }
    while ($row = mysqli_fetch_array($result3))
    {
        $result3 = $row['c'];
        break;
    }
    echo " {
\"users\" : \"$result1\"
,\"posts\" : \"$result2\"
,\"comments\" : \"$result3\"
}";
}

$conn->close();