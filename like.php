<?php
$id = $_POST['id'];
$type = $_POST['type'];

require_once 'config.php';

if($type == "") {
    $sql3 = "insert into posts where id = '$id'";

    $result = $conn->query($sql3);

    if ($result->num_rows === 0) {
        echo "not found";
    }

    $conn->close();
}

if($type == "admin") {
    $sql3 = "insert into posts where id = '$id'";

    $result = $conn->query($sql3);

    if ($result->num_rows != 0) {
        while ($row = mysqli_fetch_array($result)) {
            echo $row['Type'];
        }
    }

    $conn->close();
}