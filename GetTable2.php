<?php

require_once 'config.php';

$x = 0;

$sql3 = "select * from users";

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
        $id = $row['ID'];
        $username = $row['Username'];
        $password = $row['password'];
        $fullname = $row['Fullname'];
        $email = $row['email'];
        $type = $row['Type'];
        $y = $x + 1;
        $tools = "<a class='tools' onclick='deleteDynamic(".$id.")'><img style='width: 20px;height: 20px' src='img/icons/trash.png'></a>".
            "<a class='tools' onclick='updateDynamic()'><img style='width: 20px;height: 20px' src='img/icons/edit.png'></a>".
            "<a class='tools' onclick='makeAdmin(".$id.")'><img style='width: 20px;height: 20px' src='img/icons/admin.png'></a>";

        if ($x == $count - 1) {
            echo "{\"id\":\"$id\", \"Username\":\"$username\", \"Password\" : \"$password\"
            ,\"Name\" : \"$fullname\",\"Email\" : \"$email\",\"Type\" : \"$type\",\"X\" : \"$y\"
            ,\"Tools\" : \"$tools\"}";
        }
        else
        {
            echo "{\"id\":\"$id\", \"Username\":\"$username\", \"Password\" : \"$password\",\"Name\" : \"$fullname\",\"Email\" : \"$email\",\"Type\" : \"$type\",\"X\" : \"$y\"
            ,\"Tools\" : \"$tools\"},
            ";
        }
        $x++;
    }
    echo "]}";

/*    echo "<thead style=\"text-align: center;\">";
    echo "<tr>";
    echo "<th>#</th>";
    echo "<th>ID</th>";
    echo "<th>Username</th>";
    echo "<th>Password</th>";
    echo "<th>Fullname</th>";
    echo "<th>E-mail</th>";
    echo "<th>Type</th>";
    echo "<th><a onclick='signup()'><img style='width: 20px;height: 20px' src='img/icons/signup.png'></a></th>";
    echo "</tr>";
    echo "</thead>";
    echo "<tbody>";
    while ($row = mysqli_fetch_array($result))
    {
        echo "<tr>";
        echo "<td>".++$x."</td>";
        echo "<td>".$row['ID']."</td>";
        echo "<td>".$row['Username']."</td>";
        echo "<td>".$row['password']."</td>";
        echo "<td>".$row['Fullname']."</td>";
        echo "<td>".$row['email']."</td>";
        echo "<td>".$row['Type']."</td>";
        echo "<td>".
            "<a class='tools' onclick='deleteDynamic(".$row['ID'].")'><img style='width: 20px;height: 20px' src='img/icons/trash.png'></a>".
            "<a class='tools' onclick='updateDynamic()'><img style='width: 20px;height: 20px' src='img/icons/edit.png'></a>".
            "<a class='tools' onclick='makeAdmin(".$row['ID'].")'><img style='width: 20px;height: 20px' src='img/icons/admin.png'></a>".
            "</td>";
        echo "</tr>";
    }

    echo"</tbody>";
    /*echo "<tfoot>";
    echo "<tr>";
    echo "<th>#</th>";
    echo "<th>ID</th>";
    echo "<th>Username</th>";
    echo "<th>Password</th>";
    echo "<th>Fullname</th>";
    echo "<th>E-mail</th>";
    echo "</tr>";
    echo "</tfoot>";

<style>
    #TableData tr:hover
    {
        background-color: gold;
    }
    th,td {
        width:0.1%;
        white-space: nowrap;
        padding: 0;
        text-align: center;
    }
    #TableData tr.selected
    {
        background-color: brown;
    }
    .tools:hover
    {
        //background-color:cyan;
        transform: scale(1.1);
    }
</style>

*/

}

$conn->close();