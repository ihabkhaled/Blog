<?php

require_once 'config.php';

    $sql3 = "select * from users where online = 'online'";

    $result = $conn->query($sql3);
    if ($result->num_rows === 0) {
        echo "Empty";

    } else {
        $count = $result->num_rows;
        $x = 0;
        $data = "";
        while ($row = mysqli_fetch_array($result))
        {
            $userArr = array();
            $user = $row['Username'];
            array_push($userArr,$user);
            if ($x == $count - 1) {
                $data.= '"' . $userArr[0] . '"';
            } else {
                $data.= '"' . $userArr[0] . '"' . " , ";
            }
            $x++;
        }
        //echo $data;
        echo " { \"user\" : [ $data ] }";
    }

$conn->close();