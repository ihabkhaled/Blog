<?php
if(isset($_GET['id']))
{
    if(!is_numeric($_GET['id']))
    {
        header('Location: ./');
    }
    else
    {
        $id = $_GET['id'];
        require 'config.php';
        $sql3 = "select * from posts  where id = $id" ;
        $result = $conn->query($sql3);

        if($result->num_rows === 0) {
            include 'header.php';
            $buffer=ob_get_contents();
            ob_end_clean();
            $buffer=str_replace("%title%","Topic Not Found",$buffer);
            $buffer=str_replace("%description%","Not Found",$buffer);
            $buffer=str_replace("%author%","Not Found",$buffer);
            echo $buffer;
        }
        else {
            $row = mysqli_fetch_array($result);
                $id = $row['id'];
                $title = $row['Title'];
                $title = str_replace(array("\""), "&#8243;", $title);
                $title = str_replace(array("'","\\\'"), "&#8242;", $title);
                $title = str_replace(array("<"), "&lt;", $title);
                $title = str_replace(array(">"), "&gt;", $title);
                $title = str_replace(array("\r","\n"), "<br>", $title);
                $title = str_replace(array("\t"), " ", $title);
                $content = $row['Content'];
                $content = str_replace(array("\""), "&#8243;", $content);
                $content = str_replace(array("'","\\\'"), "&#8242;", $content);
                $content = str_replace(array("<"), "&lt;", $content);
                $content = str_replace(array(">"), "&gt;", $content);
                $content = str_replace(array("\r","\n"), "<br>", $content);
                $content = str_replace(array("\t"), " ", $content);
                $user = $row['User'];
                $comments = $row['Comments'];
                $likes = $row['Likes'];
                $dislikes = $row['Dislikes'];
                $date = $row['Date'];
            include 'header.php';
            $buffer=ob_get_contents();
            ob_end_clean();
            $buffer=str_replace("%title%",$title,$buffer);
            $buffer=str_replace("%description%",$content,$buffer);
            $buffer=str_replace("%author%",$user,$buffer);
            echo $buffer;
        }
        $conn->close();
    }
}
else
{
    header('Location: ./');
}
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

        <h4 style="color: white; text-align: left; display: inline-block" class="usernameCont"></h4>
        <button style="float: right;" class="btn btn-primary" onclick='logout()'> Logout </button>

        <div class="panel-body">

            <!-- Post Content -->
            <div id="UserContent" align="center" style="text-align: center;  display: none;" class="row">
                <div style="padding: 0;" class="col-md-12">

                    <div id="" style="opacity: 0.92" class="panel panel-primary topic">
                        <div  class="panel-heading">
                            <h4 style="color: white; text-align: left;display: inline-block;">{{ title }}</h4>
                            <button style="float: right; margin-left: 15px" class="btn btn-primary collapButt" onclick='$("#UserPanel").slideToggle(200)'> -- </button>
                        </div>

                        <div id="UserPanel" class="panel-body" style="padding: 15px; width: 100%;">
                            <div id="Buttons" style="float: left;">
                            </div>

                            <!-- The Topic -->
                            <div class="panel-body panel panel-primary" style='padding: 20px'>
                            <div class="col-md-2" style="padding: -5px;">
                                <a style='' class='tools deletePost' onclick='deletePost(0)'><img style='width: 20px;height: 20px' src='img/icons/trash.png'></a>
                                <a style='' class='tools editPost' onclick='editPost(0)'><img style='width: 20px;height: 20px' src='img/icons/edit.png'></a>
                                <div class="sidebar" style="padding-top:10px; padding-bottom:3px; padding-left:15px;margin: 3px">
                                    <p style='cursor: pointer;' class="usernamePost" onclick='getSelectedUser($(this).html())'>{{user}}</p>
                                    <p> {{date}} </p>
                                </div>
                                <i align='left' style="font-size: 2em" onclick="LikeFunction(this)" class="fa fa-thumbs-o-up"></i> {{likes}}
                                <i align='left' style="font-size: 2em" onclick="DislikeFunction(this)" class="fa fa-thumbs-o-down"></i> {{dislikes}}
                            </div>
                            <div style="padding: -5px;" class="col-md-10 contentover">
                                <div style="padding: -5px;text-align: left;" class="col-md-2">
                                    <p class='TopicID' style="display: inline-block">{{ id }}</p>
                                    <h3 class='Title' style="color: black;">{{ title }}</h3>
                                </div>
                                <div style="padding: -5px;" class="col-md-10 theBorder">
                                    <span class="part">{{ content }}</span>
                                    <span style="display:none;" class="complete">{{ content }}{{ content2 }}</span>
                                    <p onclick="showMore(0)" class="more">more</p>
                                    <hr style='width: 80%'>
                                    <p onclick="showAllComments(0)" class="moreComment">See Comments</p>
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

        <!-- Edit Topic -->
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


<script src="script/jquery-3.3.1.min.js?n=1"></script>
<script src="script/board.js"></script>
<script src="script/vue.js"></script>
<script>
    $(document).ready(function() {
        var currentTime = new Date();
        var content = '<?php echo $content ?>';
        var trimmedString = content.substring(0, 100);
        var trimmedString2 = content.substring(100, content.length);
        var dateOfTopic = Date.parse('<?php echo $date ?>');
        diff = currentTime - dateOfTopic;
        diff = diff / 1000 / 60 / 60 / 24;
        var DateString;
        DateString = postDate();
        new Vue({
            el: ".topic",
            data: {
                id: '<?php echo $id ?>',
                title: '<?php echo $title ?>',
                content: trimmedString,
                content2: trimmedString2,
                user: '<?php echo $user ?>',
                comments: '<?php echo $comments ?>',
                likes: '<?php echo $likes ?>',
                dislikes: '<?php echo $dislikes ?>',
                date: DateString
            }
        });
    });
</script>
<script src="script/bootstrap.js?n=1"></script>
<script src="script/pagination.js"></script>

<script>
    $.getScript("script/ihab.js?"+ new Date().getTime());
</script>
<script src="script/send.js?n=1"></script>

</body>
</html>