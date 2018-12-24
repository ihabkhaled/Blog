<?php
session_start();
if (!isset($_SESSION['login_user']))
{
    echo 'the session is empty';
}
else {
    echo $_SESSION["login_user"];
}