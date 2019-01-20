<!DOCTYPE html>
<html>
<head>
    <link rel='shortcut icon' type='image/x-icon' href='favicon.ico' />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" charset="UTF-8">
    <link rel="stylesheet" href="css/bootstrap.css?modified=20012009">
    <link rel="stylesheet" href="css/bootstrap-theme.css?modified=20012009">
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <link rel="stylesheet" href="css/pagination.css?modified=20012009">
    <link rel="stylesheet" href="css/system.css?modified=20012009">

    <title>%title%</title>
    <meta name="description" content="%description%">
    <meta name="keywords" content="HTML,CSS,XML,JavaScript">
    <meta name="author" content="%author%">

</head>
<body style="background-color: black">

<div id="Logo">
    <img id="LogoImg" src="img/icons/employee.png?modified=20012009">
</div>

<!–– Navbar --!>
<nav id="TheNavBar" class="navbar navbar-inverse navbar-fixed-top">
    <div class="container-fluid">

        <div class="navbar-form navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <button onclick="marginNavbar()" type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>

        <div class="navbar-form collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul id="leftUL" style="margin-left: 45px" class="nav navbar-nav navbar-left">
                <li style="display: inline-block" class="normalLi"><img height="50" width="50" src="img/icons/home.png?modified=20012009"> <span class="sr-only">(current)</span></li>
                <li style="display: inline-block" class="dropdown normalLi">
                    <div href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><img height="50" width="50" src="img/icons/menu.png?modified=20012009"><a><span class="caret"></span></a></div>
                    <ul class="dropdown-menu">
                        <li><a href="#" onclick="features()">Website Features</a></li>
                        <li><a href="#">Another action</a></li>
                        <li><a href="#">Something else here</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="#">Separated link</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="#">One more separated link</a></li>
                    </ul>
                </li>
                <li style="display: inline-block" class="normalLi"><img height="50" width="50" src="img/icons/about.png?modified=20012009"></li>
                <li style="display: inline-block" class="normalLi"><img height="50" width="50" src="img/icons/contact.png?modified=20012009"></li>
            </ul>

            <ul style="margin-right: 25px" class="nav navbar-nav navbar-right">
                <li id="usernameNav"><a></a></li>
            </ul>
        </div>

    </div>
</nav>


<div class="MarginContent"></div>

