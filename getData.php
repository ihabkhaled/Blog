<?php

$userr = $_POST['user'];

require_once 'config.php';

$sql3 = "select * from users where Username = '$userr' or email = '$userr' or ID = '$userr'";

$result = $conn->query($sql3);

if($result->num_rows === 0) {
    echo "not found";
}
else {
    while ($row = mysqli_fetch_array($result))
    {
        //JSON
        $id = $row['ID'];
        $user = $row['Username'];
        $name = $row['Fullname'];
        $email = $row['email'];
        $avatar = $row['Avatar'];
        $type = $row['Type'];
        $avail = $row['online'];
        $date = $row['Date'];
        echo " {
        \"id\" : \"$id\"
        ,\"user\" : \"$user\"
        ,\"name\" : \"$name\"
        ,\"email\" : \"$email\"
        ,\"avatar\" : \"$avatar\"
        ,\"type\" : \"$type\"
        ,\"status\" : \"$avail\"
        ,\"date\" : \"$date\"
        }";

        //echo "<p>ID :".$row['ID']."</p>";
        //echo "<p>Username :".$row['Username']."</p>";
        //echo "<p>Full Name :".$row['Fullname']."</p>";
        //echo "<p>Email :".$row['email']."</p>";
    }
}

$conn->close();