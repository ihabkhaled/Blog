<?php
$userr = $_POST['user'];
$type = $_POST['type'];

require_once 'config.php';

if($type == "available") {
    $sql3 = "select * from users where Username = '$userr'";

    $result = $conn->query($sql3);

    if ($result->num_rows === 0) {
        echo "not found";
    }

    $conn->close();
}

if($type == "admin") {
    $sql3 = "select Type from users where Username = '$userr'";

    $result = $conn->query($sql3);

    if ($result->num_rows != 0) {
        while ($row = mysqli_fetch_array($result)) {
            echo $row['Type'];
        }
    }

    $conn->close();
}