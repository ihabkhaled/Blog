<?php
$userr = $_POST['user'];
$passs = $_POST['pass'];

require_once 'config.php';

    $sql3 = "select * from users where (Username = '$userr' and Password = '$passs') or (email = '$userr' and Password = '$passs')";

    $result = $conn->query($sql3);

    if ($result->num_rows === 0) {
        echo "User not found";
    } else {
        $expire = 365*24*3600; // We choose a one year duration
        ini_set('session.gc_maxlifetime', $expire);
        session_start();
        setcookie(session_name(),session_id(),time()+$expire);

            while ($row = mysqli_fetch_array($result)) {
                $user = $row['Username'];
                $_SESSION['login_user']= $user;
            }
    }

$conn->close();