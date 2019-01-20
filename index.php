<?php
include 'header.php';
$buffer=ob_get_contents();
ob_end_clean();

$buffer=str_replace("%title%","Blog",$buffer);
$buffer=str_replace("%description%","Discussion Board",$buffer);
$buffer=str_replace("%author%","Ihab",$buffer);
echo $buffer;
?>


<div class="container" style="padding-top: 30px;padding-bottom: 30px;padding-left: 0;padding-right: 0">
<div id="loginBtn" style="text-align: center; max-width: 98%; display: none;" class="row">
    <div style="padding: 20px;" class="col-md-11">
<button style="float: left; margin-right: 4px;" class="btn btn-primary" onclick='loginview()'> Login </button>
        <button style="float: left; margin-right: 4px;" class="btn btn-primary" onclick='signup(true)'> Signup </button>
    </div>
    <div style="padding: 20px;" class="col-md-1"></div>
    <div><hr style="color: black; width:100%;"></div>
</div>


    <div id="AllContent" style="display: none;" class="">


        <div align="center" class="UpButton">
            <div class="StringBut"></div>

        </div>

        <h4 style="color: white; text-align: left; display: inline-block" class="usernameCont"></h4>
        <button style="float: right;" class="btn btn-primary" onclick='logout()'> Logout </button>
        <!--<div class="panel-heading">

            <button style="float: right; margin-right: 4px;" class="btn btn-primary" onclick='logout()'> Logout </button>
        </div>-->

        <div class="panel-body">

    <!-- Admin User -->
<div id="AdminContent" align="left" style="text-align: center; display: none;" class="row">
    <div style="padding: 10px;padding-left: 0; padding-right: 0" class="col-md-12">

        <div style="opacity: 0.92" class="panel panel-primary">

            <div class="panel-heading">

                <h4 style="color: white; text-align: left;display: inline-block">Admin Panel</h4>

                <button style="float: right; margin-left: 15px" class="btn btn-primary" onclick='$("#AdminPanel").slideToggle(300)'> -- </button>

            </div>

            <div id="AdminPanel" class="panel-body" style="display: none">

                <div id="Buttons" style="float: left; margin-bottom: 25px">
                    <button style="float: left; margin-right: 4px;" id="getdata" class="btn btn-primary" onclick='getData2()' type=button> ShowAll </button>
                    <button style="float: left; margin-right: 4px;" id="refreshData" class="btn btn-primary" onclick='refreshTable()' type=button> Refresh </button>
                    <button style="float: left; margin-right: 4px;" class="btn btn-primary" onclick='signup()'> Add User </button>
                    <!--<button style="float: left; margin-right: 4px;" class="btn btn-primary" onclick='logout()'> Logout </button>-->
                    <input id="NameSearch" type="text" style="float: left; " class="form-control" oninput="search()" placeholder="Search">
                </div>
                <div><hr style="color: black; width:100%;"></div>
                <div id="TableDiv" style="overflow-x:auto;display: none; width:100%; background-color: #FFFFFF;padding: 20px">
                    <p style="background-color: #FFFFFF" class="idNo"></p>
                    <table style="display: none; width:100%;" id="TableData" class="table table-striped table-bordered">

                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

    <!-- Normal User -->
    <div id="UserContent" align="center" style="text-align: center;  display: none;" class="row">
        <div style="padding: 0;" class="col-md-12">

            <div style="opacity: 0.92" class="panel panel-primary">

                <div class="panel-heading">

                    <h4 style="color: white; text-align: left;display: inline-block;">User Panel</h4>
                    <button style="float: right; margin-left: 15px" class="btn btn-primary collapButt" onclick='$("#UserPanel").slideToggle(200)'> -- </button>
                </div>

                <div id="UserPanel" class="panel-body" style="padding: 2px; width: 100%;">
                    <div id="Buttons" style="float: left;">
                        <button style="float: left; margin-right: 4px;" class="btn btn-primary" onclick='showTopic()'> Add Topic </button>
                        <button title="Refresh Topics" style="cursor: pointer;width: 60px;height: 40px;border: none;background-color: Transparent;overflow: hidden;outline:none;" id="updateTopics" onclick="diss()"><img width="35" height="35" src="img/icons/update.png" alt="Refresh Topics"></button>
                    </div>
                    <div style="overflow-x:auto; width:100%; background-color: #FFFFFF;padding-left: 20px;padding-right: 20px;">

                    <!--The Discussion Board-->
                    <div style="padding: 0; width:100%;" id="wrapper">
                        <section style="padding: 0; width:100%;">
                            <div style="padding: 0;" class="data-container"></div>
                            <div style="" id="page-demo1"></div>
                        </section>
                    </div>
                    </div>

                    <div align="center" style="text-align: center; width:98%; margin-left: 1%">
                        <div style="padding: 0;" class="col-md-12">
                            <div style="opacity: 0.92" class="panel panel-primary">
                                <div class="panel-heading">
                                    <h4 style="color: white; text-align: left;display: inline-block;">Statistics</h4>
                                    <button style="float: right; margin-left: 15px" class="btn btn-primary collapButt" onclick='$("#Statistics").slideToggle(300)'> -- </button>
                                </div>

                                <div id="Statistics" class="panel-body" style="padding: 2px; display: none;overflow: hidden">
                                    <br>
                                    <div>
                                    <div style="padding: 0;" class="col-md-3">No. of Users : <span id="countUsers"></span></div>
                                    <div style="padding: 0;" class="col-md-3">No. of Posts : <span id="countPosts"></span></div>
                                    <div style="padding: 0;" class="col-md-3">No. of Comments : <span id="countCmnts"></span></div>
                                    <div style="padding: 0;" class="col-md-3">No. of Visits : <span id="countVisits"></span></div>
                                    </div>
                                    <br>
                                    <br>
                                    <div align="center">
                                        <div style="padding: 0;" class="col-md-3">Top 10 Publishers<br><div style="text-align: center;" id="TopPosters"></div></div>
                                        <div style="padding: 0;" class="col-md-2">Top 10 Commenters<div style="text-align: center;" id="TopCommenters"></div></div>
                                        <div style="padding: 0;" class="col-md-3">Top 10 Topics<div style="text-align: center;" id="TopTopics"></div></div>
                                        <div style="padding: 0;" class="col-md-3">Most Recent<div style="text-align: center;" id="MostRecent"></div></div>
                                    </div>
                                    <div align="left" style="overflow-x:auto; width:100%; background-color: #FFFFFF;padding: 20px">
                                        <hr style="color: black;">
                                        <b><span style="font-size: medium">Online Users : </span></b> <span class="onlineUsers"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>
        </div>
    </div>
</div>

<div style="margin-bottom: 100px"></div>

<!--<div id="MyFooter" style="width: 100%; position: fixed; bottom: 0; height: 55px; background-color: black;border: none;
box-shadow: 0 6px 12px rgba(10, 20, 30, 0.12), 0 6px 12px rgba(0, 0, 0, 0.24);">

</div>-->


<div align="center" class="navss">
    <p style="padding-top: 5%" onclick="features()">Site Features</p>
</div>

<!-- Side navigation -->

<div style="display: none;" onmouseover="showframe()" onmouseout="hideframe()" class="sidenav">
    <div class="userDataPanel" style="border: thin #ffffff solid;">
        <div align="center" style="display: none" id="UserSideData">
        <b><p align="left" style="font-size: 28px;">User data</p></b>
        <div style="margin-left: 20px" align="left" id="usernameWelcomeSide" ></div>
            <div style="margin-left: 20px" align="left"><button style="text-align: right" class="btn btn-primary" onclick='logout()'> Logout </button></div>
        <div align="center" id="theImg">
            <img class="img-circle" id="TheAvatar" src="" style="margin-top: 15px;" width="100" height="100">
        </div>

        <form style="margin-top: 3px" id="uploadFile" method="post" enctype="multipart/form-data">
            <input onchange="$('#submitAvatar').click();" type="file" name="fileToUpload" id="fileToUpload" style="display: none">
            <input style="color: black;display: none"" type="text" id="UserNameToUpload" name="username" value="" />
            <!--$('#submitAvatar').css('display','block');$('#TheFileBut2').css('display','none');-->
            <input id="TheFileBut2" class="btn btn-primary" type="button" value="Browse" onclick="document.getElementById('fileToUpload').click();" name="Browse">
            <input style="display: none;" id="submitAvatar" class="btn btn-primary" type="submit" value="Upload Image" name="submit">
            <input style="display: none" id="ResetB" type="reset" value="Restore" />
            <div id="loading"></div>
        </form>

            <br>
            <button class="btn btn-primary" type="button" value="Submit" onclick="$('#changePassword').slideToggle(250)">Change Password</button>
            <div id="changePassword" style="margin-bottom: 5px; border: #D0D0D0 solid thin;display: none;padding: 3px">
                <form style="" action="javascript:changePassword()">
                    <input placeholder="Current Password" id="curPasswordChange" class="form-control" required type="password">
                    <input placeholder="New Password" id="newPasswordChange" class="form-control" required type="password">
                    <input id="" class="btn btn-primary" type="button" value="Submit">
                </form>
            </div>

        </div>
    </div>
</div>

<div id="frameOfMenu"></div>

<div style="display: none;" class="form">

    <b><span style="position: absolute;top: -40px;right: 0; font-size: x-large;color: red;cursor: pointer">XXXX</span></b>

    <div class="frames">
        <div id="TextDone" style="opacity:0.9; text-align: center; margin-left:15%;margin-right:15%; margin-top: 4%;margin-bottom: 4%;display: none;">
            <p style="display: none; font-size: xx-large;color: black;font-style: oblique"></p>
        </div>

        <!-- SignUp -->
        <div id="signupframe" style="text-align: center; margin-left:15%;margin-right:15%;margin-top: 4%;margin-bottom: 4%;display: none;">
            <span style="display: none" id="signupType"></span>
            <form action="javascript:send($('#signupType').html())">
                <div class="Inputs">
                    <input placeholder="Username" id="usernamein" class="form-control" required type="text">
                    <input placeholder="Password" id="passwordin" class="form-control" required type="password">
                    <input placeholder="FullName" id="fullnamein" class="form-control" required type="text">
                    <input placeholder="Email" id="emailin" class="form-control" required type="email">
                    <input id="btsignup" style="width: 80px" class="btn btn-primary" type="submit" value="Submit">
                    <br><b><span style="color:red" id="signupError"></span></b>
                </div>
                <!-- <button style="float: right; " id="btsignup" class="btn btn-primary" onclick='send()' type=button> Submit </button> -->
            </form>
        </div>

        <!-- Update -->
        <div id="updateframe" style="text-align: center; margin-left:15%;margin-right:15%;margin-top: 4%;margin-bottom: 4%;display: none;">
            <form action="javascript:update()">
                <div class="Inputs">
                    <p style="background-color: #FFFFFF" class="idNo"></p>
                    <input placeholder="Username" id="userUpdate" class="form-control" required type="text">
                    <input placeholder="Password" id="passUpdate" class="form-control" required type="password">
                    <input placeholder="FullName" id="fullnameUpdate" class="form-control" required type="text">
                    <input placeholder="Email" id="emailUpdate" class="form-control" required type="email">
                    <input id="btupdate" style="width: 80px" class="btn btn-primary" type="submit" value="Update">
                    <br><b><span style="color:red" id="updateError"></span></b>
                </div>
            </form>
        </div>

        <!-- login -->
        <div id="loginframe" style="text-align: center; margin-left:15%;margin-right:15%;margin-top: 4%;margin-bottom: 4%;display: none;">
            <div data-role="popup" class="ui-content">
                <span id="loginError"></span>
                <form action="javascript:login()">
                    <div class="Inputs">
                        <input placeholder="Enter Username or Email" id="usernamelog" class="form-control" type="text" required>
                        <input placeholder="Password" id="passwordlog" class="form-control" type="password" required>
                        <label class="checkbox-inline"><input style="width: 20px" type="checkbox" value="">Remember Me</label>
                        <input id="btlog" style="width: 80px" class="btn btn-primary" type="submit" value="Login">
                    </div>
                    <!-- <button id="btlog" style="float: right" class="btn btn-primary" onclick='login()' type=button> Submit </button>-->
                </form>
            </div>
        </div>

        <!-- Add Topic -->
        <div id="addTopic" style="text-align: center; margin-left:15%;margin-right:15%;margin-top: 4%;margin-bottom: 4%;display: none;">
            <form action="javascript:addTopic()">
                <div class="Inputs">
                    <p id="userPosting"></p>
                    <input placeholder="Title" id="title" class="form-control" required type="text">
                    <!--<input placeholder="Content" id="content" class="form-control" required type="text">-->
                    <textarea rows="8" id="content" class="form-control" name="Content" placeholder="Content"></textarea>
                    <input id="btAddTopic" style="width: 80px" class="btn btn-primary" type="submit" value="Submit">
                    <br><b><span style="color:red" id="topicError"></span></b>
                </div>
                <!-- <button style="float: right; " id="btsignup" class="btn btn-primary" onclick='send()' type=button> Submit </button> -->
            </form>
        </div>

        <!-- Add Topic -->
        <div id="editTopic" style="text-align: center; margin-left:15%;margin-right:15%;margin-top: 4%;margin-bottom: 4%;display: none;">
            <form action="javascript:editTopic($('#topicID').html())">
                <div class="Inputs">
                    <p id="postID"></p>
                    <input placeholder="Title" id="title2" class="form-control" required type="text">
                    <textarea rows="8" id="content2" class="form-control" name="Content" placeholder="Content"></textarea>
                    <input id="btEditTopic" style="width: 80px" class="btn btn-primary" type="submit" value="Submit">
                    <br><b><span style="color:red" id="topicError"></span></b>
                    <span id="topicID" style="display: none"></span>
                </div>
                <!-- <button style="float: right; " id="btsignup" class="btn btn-primary" onclick='send()' type=button> Submit </button> -->
            </form>
        </div>

        <!-- selected userdata -->
        <div id="selectedUser" style="text-align: center; margin-left:15%;margin-right:15%; margin-top: 6%;margin-bottom: 6%;display: none; overflow: auto">

        </div>

        <div id="features" style="text-align: center; margin-left:15%;margin-right:15%;margin-top: 6%;margin-bottom: 6%;display: none;">
            <div id="Features">
                <iframe frameborder="0" style="height: 100%; width: 100%"></iframe>
            </div>
        </div>
    </div>

</div>

<div style="display: none;" class="loading">
    <img src="img/Loading_icon.gif">
</div>

<div class="lazyLoadPage">
    <div class="loading">
        <img src="img/Loading_icon.gif">
    </div>
</div>

<div style="display: none;" class="profilePic">
    <img style="margin-left: auto;margin-right: auto;width:50%;" src="" id="profilepic">
</div>

<div style="display: none;" class="backform"></div>

<span style="display: none" id="UserN"></span>
<span style="display: none" id="UserType"></span>
<span style="display: none" id="UserP"></span>


<table style="display: none; width:100%;" id="TableData2" class="table table-striped table-bordered">

</table>

<table style="display: none; width:100%;" id="TableData3" class="table table-striped table-bordered">

</table>

<script src="script/jquery-3.3.1.min.js?n=1"></script>
<script src="script/bootstrap.js?n=1"></script>
<script src="script/pagination.js"></script>
<script src="script/jquery.dataTables.js?n=1"></script>
<script>
    $.getScript("script/ihab.js?"+ new Date().getTime());
</script>
<script src="script/send.js?n=1"></script>
<script src="script/board.js?n=1"></script>

</body>
</html>