<?php
session_start();

if (!isset($_SESSION['login_user']))
{
    echo 'the session is empty';
}
else {
    session_unset();
    session_destroy();
}

