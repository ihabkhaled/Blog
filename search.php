<style>
    #TableData tr:hover
    {
        background-color: gold;
    }
    th,td {
        width:0.1%;
        white-space: nowrap;
        padding: 0;
    }
    #TableData tr.selected
    {
        background-color: brown;
    }
</style>

<?php
$userr = $_POST['user'];

require_once 'config.php';

$x = 0;

$sql3 = "select * from users where Username like '$userr%' or email like '$userr%' or Fullname like '$userr%'";

$result = $conn->query($sql3);

if ($result->num_rows === 0) {
    echo "Not found";

}
else {
    echo "<thead>";
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
            "<a onclick='deleteDynamic()'><img style='width: 20px;height: 20px' src='img/icons/trash.png'></a>".
            "<a onclick='updateDynamic()'><img style='width: 20px;height: 20px' src='img/icons/edit.png'></a>".
            "<a onclick='makeAdmin()'><img style='width: 20px;height: 20px' src='img/icons/admin.png'></a>".
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
    echo "<th>Date</th>";
    echo "</tr>";
    echo "</tfoot>";*/

}
$conn->close();