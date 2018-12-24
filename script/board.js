function LikeFunction(x) {
    //x.classList.toggle("fa-thumbs-o-down");
}

function DislikeFunction(x) {
    //x.classList.toggle("fa-thumbs-o-up");
}

function editPost(i) {
    i = i%5;
    $("#topicID").html(i);
    var id = $(".TopicID").eq(i).html();
    var title = $(".Title").eq(i).html();
    var content = $(".complete").eq(i).html();
    $("#postID").html(id);
    $("#title2").val(title);
    $("#content2").val(content);
    $('.form').show();
    $('.backform').show();
    $('#editTopic').show();
}

function deletePost(i) {
    i = i%5;
    var id = $(".TopicID").eq(i).html();
    var r = confirm("Are you sure you want to delete post");

    if(r == true) {
        if (id != null && id != "") {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

                    if (xmlhttp.responseText.toString() == "Values Deleted successfully") {
                        $(".TopicNo").eq(i).hide();
                        done("Post Deleted Successfully");
                    }
                    else {
                        alert(xmlhttp.responseText);
                    }
                }
            };
            xmlhttp.open("POST", "deleteTopic.php", true);
            xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xmlhttp.send("id=" + id);
            xmlhttp.preventDefault();
        }
    }
}

function showMore(i){
    i = i%5;
    if($(".complete").eq(i).is(":hidden"))
    {
        $(".complete").eq(i).show();
        $(".part").eq(i).hide();
        $(".more").eq(i).text("less");
    }
    else
    {
        $(".part").eq(i).show();
        $(".complete").eq(i).hide();
        $(".more").eq(i).text("more");
    }
}

function showAllComments(i){
    i = i%5;
    //alert(i);
    if($(".moreComment").eq(i).html() == "See Comments")
    {
        $(".comments").eq(i).slideToggle(500);
        /*alert($(".comments").eq(i).html());*/
        $(".moreComment").eq(i).html("Hide Comments");
    }
    else
    {
        $(".comments").eq(i).slideToggle(500);
        $(".moreComment").eq(i).html("See Comments");
    }
}

function showAllCommentsExist(i)
{
    if($(".comments").eq(i).html() == "No Comments")
    {
        $(".moreComment").eq(i).hide();
    }
    else
    {
        $(".moreComment").eq(i).show();
    }
}

function goToUser(i)
{
    getSelectedUser(i);
}

var userJSON;
var userJSONtmp;
var userJSON2;
function showTopics() {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

                    if (xmlhttp.responseText.toString() !== "not found") {
                        userJSON = this.responseText;
                        userJSON2 = userJSON;
                        if (userJSONtmp == null) {
                            userJSONtmp = userJSON2;
                        }
                        else {
                            if (userJSONtmp == userJSON2) {

                            }
                            else {
                                refreshTopics();
                                userJSONtmp = userJSON2;
                            }
                        }
                    }
                    else {

                    }
                }
            };
            xmlhttp.open("POST", "getBoard.php", true);
            xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xmlhttp.send();
}

function postDate()
{
    if(diff >= 365)
    {
        var yr = diff/365;
        yr = Math.trunc(yr);
        var DateString = yr + " y ago";
    }
    else if(diff >= 30)
    {
        var mon = diff/30;
        mon = Math.trunc(mon);
        var DateString = mon + " M ago";
        return DateString;
    }
    else if(diff >= 7)
    {
        var week = diff/7;
        week = Math.trunc(week);
        var DateString = week + " w ago";
        return DateString;
    }
    else if(diff >= 1)
    {
        var day = Math.trunc(diff);
        var DateString = day + " d ago";
        return DateString;
    }
    else if(diff < 1)
    {
        var clock = diff * 24;
        if(clock>1)
        {
            var DateString = Math.trunc(clock) + " h ago";
            return DateString;
        }
        else
        {
            clock = clock * 60;
            if(clock>1)
            {
                var DateString = Math.trunc(clock) + " m ago";
                return DateString;
            }
            else
            {
                clock = clock * 60;
                var DateString = Math.trunc(clock) + " s ago";
                return DateString;
            }
        }
    }
}
function postDateCmt()
{
    if(diff2 >= 365)
    {
        var yr = diff2/365;
        yr = Math.trunc(yr);
        var DateString = yr + " y ago";
    }
    else if(diff2 >= 30)
    {
        var mon = diff2/30;
        mon = Math.trunc(mon);
        var DateString = mon + " M ago";
        return DateString;
    }
    else if(diff2 >= 7)
    {
        var week = diff2/7;
        week = Math.trunc(week);
        var DateString = week + " w ago";
        return DateString;
    }
    else if(diff2 >= 1)
    {
        var day = Math.trunc(diff2);
        var DateString = day + " d ago";
        return DateString;
    }
    else if(diff2 < 1)
    {
        var clock = diff2 * 24;
        if(clock>1)
        {
            var DateString = Math.trunc(clock) + " h ago";
            return DateString;
        }
        else
        {
            clock = clock * 60;
            if(clock>1)
            {
                var DateString = Math.trunc(clock) + " m ago";
                return DateString;
            }
            else
            {
                clock = clock * 60;
                var DateString = Math.trunc(clock) + " s ago";
                return DateString;
            }
        }
    }
}


function deleteComment(i,j) {

}


$(document).on('click', '.deleteComment',function(){
    var r = confirm("Are you sure you want to delete comment");
    //alert(cmid);
    if(r == true) {
        var index = $('.deleteComment').index(this);
        var cmid = $('.commentID').eq(index).html();
        alert(cmid);
        //$('.Thecomment').eq(index).hide();
    }
});

$(document).on('click', '.editComment',function(){
    var index = $('.editComment').index(this);
    var cmid = $('.Thecomment').eq(index).html();
    //alert(cmid);
});

var diff,diff2;

function refreshTopics() {
    console.log("sent");
    //$("#updateTopics").prop('disabled', true);
    //$(".updateTopics").attr("disabled","disabled");

    var xmlhttp2 = new XMLHttpRequest();
    xmlhttp2.onreadystatechange = function() {
        if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {

            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    //console.log();

                    if (xmlhttp.responseText.toString() !== "not found") {
                        userJSON = xmlhttp.responseText;
                        userJSON = JSON.parse(userJSON);
                        var count = userJSON.data.length;
                        var currentTime = new Date();
                        currentTime = Date.parse(currentTime);

                        if (xmlhttp2.responseText.toString() !== "not found") {
                            //$("#updateTopics").prop('disabled', true);
                            var commentJSON = xmlhttp2.responseText;
                            commentJSON = JSON.parse(commentJSON);
                            var countComment = commentJSON.data.length;

                            $(function () {
                                (function (name) {
                                        var container = $('#page-' + name);
                                        var sources = function () {
                                            var result2 = [];
                                            for (var i = 0; i < count; i++) {
                                                var trimmedString = userJSON.data[i].Content.substring(0, 100);
                                                var trimmedString2 = userJSON.data[i].Content.substring(100, userJSON.data[i].Content.length);
                                                var dateOfTopic = Date.parse(userJSON.data[i].Date);
                                                diff = currentTime - dateOfTopic;
                                                diff = diff / 1000 / 60 / 60 / 24;
                                                var DateString;
                                                DateString = postDate();

                                                if ($("#UserType").html() === "admin") {
                                                    result2.push(
                                                        "<div style=\"text-align: center; margin: -5px;padding: -5px\" class=\"row TopicNo\">" +
                                                        "<div style=\"\" class=\"panel panel-primary\">" +
                                                        "<div class=\"\">" +
                                                        "</div>" +
                                                        "<div class=\"panel-body\" style='padding-top: 10px'>" +
                                                        "<div class=\"col-md-2\" style=\"padding: -5px;\">" +
                                                        "<a style='' class='tools deletePost' onclick='deletePost(" + i + ")'><img style='width: 20px;height: 20px' src='img/icons/trash.png'></a>" +
                                                        "<a style='' class='tools editPost' onclick='editPost(" + i + ")'><img style='width: 20px;height: 20px' src='img/icons/edit.png'></a>" +
                                                        "<div class=\"sidebar\" style=\"padding-top:10px; padding-bottom:3px; padding-left:15px;margin: 3px\">" +
                                                        "<p style='cursor: pointer;' class=\"usernamePost\" onclick='goToUser($(this).html())'>" + userJSON.data[i].User + "</p>" +
                                                        "<p>" + DateString + "</p>" +
                                                        "</div>" +
                                                        "<i align='left' style=\"font-size: 2em\" onclick=\"LikeFunction(this)\" class=\"fa fa-thumbs-o-up\"></i>" + userJSON.data[i].Likes +
                                                        "<i align='left' style=\"font-size: 2em\" onclick=\"DislikeFunction(this)\" class=\"fa fa-thumbs-o-down\"></i>" + userJSON.data[i].Dislikes +
                                                        "</div>" +
                                                        "<div style=\"padding: -5px;\" class=\"col-md-10 contentover\">" +
                                                        "<div style=\"padding: -5px;text-align: left;\" class=\"col-md-2\">" +
                                                        "<p class='TopicID' style=\"display: inline-block\">" + userJSON.data[i].id + "</p>" +
                                                        "<h3 class='Title' style=\"color: black;\">" + userJSON.data[i].Title + "</h3>" +
                                                        "</div>" +
                                                        "<div style=\"padding: -5px;\" class=\"col-md-10 theBorder\">" +
                                                        "<span class=\"part\">" + trimmedString + "</span>" +
                                                        "<span style=\"display:none;\" class=\"complete\">" + trimmedString + trimmedString2 + "</span>" +
                                                        "<p onclick=\"showMore(" + i + ")\" class=\"more\">more</p>" +
                                                        "<hr style='width: 80%'>" +
                                                        "<p onclick=\"showAllComments(" + i + ")\" class=\"moreComment\">See Comments</p>" +
                                                        "<div class=\"comments\">"
                                                    );

                                                    result2[i] += "No Comments";

                                                    for (var j = 0; j < countComment; j++) {
                                                        var pid = commentJSON.data[j].Pid;
                                                        var id = commentJSON.data[j].id;
                                                        var user = commentJSON.data[j].User;
                                                        var date = commentJSON.data[j].Date;
                                                        var cmt = commentJSON.data[j].Comment;

                                                        var dateOfcmt = Date.parse(date);
                                                        diff2 = currentTime - dateOfcmt;
                                                        diff2 = diff2 / 1000 / 60 / 60 / 24;
                                                        var DateString2;
                                                        DateString2 = postDateCmt();

                                                        var comment = "<div class='Thecomment'><span style='display: none'><span class='commentID'>" + id + "</span>" + " | </span>"  +
                                                            "<b><span style='cursor: pointer;color: blue;font-size: medium' class='usernameComment' onclick='goToUser($(this).html())'>" + user + "</span></b>" +
                                                            "&nbsp&nbsp&nbsp" + cmt + "&nbsp&nbsp&nbsp&nbsp&nbsp" + "<span><span style='color: darkgray;text-align: right;'>" + DateString2 + "</span>" +
                                                            "&nbsp&nbsp&nbsp" + "<a style='' class='tools deleteComment' onclick='deleteComment(" + id + ")'><img style='width: 20px;height: 20px' src='img/icons/trash.png'></a>" +
                                                            "<a style='' class='tools editComment' onclick='editComment(" + i + ")'><img style='width: 20px;height: 20px' src='img/icons/edit.png'></a>" +
                                                            "<br><p style='padding: 0'></p></span></div>";
                                                        //alert(pid);
                                                        if (pid == userJSON.data[i].id) {
                                                            //console.log(comment + " - " + pid);
                                                            result2[i] += comment;
                                                            result2[i] = result2[i].replace("No Comments", "");
                                                        }
                                                    }

                                                    result2[i] +=
                                                        "</div>" +
                                                        "<textarea class='typeComment' onkeydown=\"SendCommentData(" + userJSON.data[i].id + ")\" placeholder='Type Comment' rows=\"1\" class=\"typeComment\"></textarea>" +
                                                        "</div>" +
                                                        "</div>" +
                                                        "</div>" +
                                                        "</div>" +
                                                        "</div>";
                                                }
                                                else {
                                                    if ($("#UserN").html().toLowerCase() === userJSON.data[i].User.toLowerCase()) {
                                                        result2.push(
                                                            "<div style=\"text-align: center; margin: -5px;padding: -5px\" class=\"row TopicNo\">" +
                                                            "<div style=\"\" class=\"panel panel-primary\">" +
                                                            "<div class=\"\">" +
                                                            "</div>" +
                                                            "<div class=\"panel-body\" style='padding-top: -5px'>" +
                                                            "<div class=\"col-md-2\" style=\"padding: -5px;\">" +
                                                            "<a style='' class='tools deletePost' onclick='deletePost(" + i + ")'><img style='width: 20px;height: 20px' src='img/icons/trash.png'></a>" +
                                                            "<a style='' class='tools editPost' onclick='editPost(" + i + ")'><img style='width: 20px;height: 20px' src='img/icons/edit.png'></a>" +
                                                            "<div class=\"sidebar\" style=\"padding-top:10px; padding-bottom:3px; padding-left:15px;margin: 3px\">" +
                                                            "<p style='cursor: pointer;' class=\"usernamePost\" onclick='goToUser($(this).html())'>" + userJSON.data[i].User + "</p>" +
                                                            "<p>" + DateString + "</p>" +
                                                            "</div>" +
                                                            "<i align='left' onclick=\"LikeFunction(this)\" class=\"fa fa-thumbs-o-up\"></i>" + userJSON.data[i].Likes +
                                                            "<i align='left' onclick=\"DislikeFunction(this)\" class=\"fa fa-thumbs-o-down\"></i>" + userJSON.data[i].Dislikes +
                                                            "</div>" +
                                                            "<div style=\"padding: -5px;\" class=\"col-md-10 contentover\">" +
                                                            "<div style=\"padding: -5px;text-align: left;\" class=\"col-md-2\">" +
                                                            "<p class='TopicID' style=\"display: inline-block\">" + userJSON.data[i].id + "</p>" +
                                                            "<h3 class='Title' style=\"color: black;\">" + userJSON.data[i].Title + "</h3>" +
                                                            "</div>" +
                                                            "<div style=\"padding: -5px;\" class=\"col-md-10 theBorder\">" +
                                                            "<span class=\"part\">" + trimmedString + "</span>" +
                                                            "<span style=\"display:none;\" class=\"complete\">" + trimmedString + trimmedString2 + "</span>" +
                                                            "<p onclick=\"showMore(" + i + ")\" class=\"more\">more</p>" +
                                                            "<hr style='width: 80%'>" +
                                                            "<p onclick=\"showAllComments(" + i + ")\" class=\"moreComment\">See Comments</p>" +
                                                            "<div class=\"comments\">"
                                                        );

                                                        result2[i] += "No Comments";

                                                        for (var j = 0; j < countComment; j++) {
                                                            var pid = commentJSON.data[j].Pid;
                                                            var id = commentJSON.data[j].id;
                                                            var user = commentJSON.data[j].User;
                                                            var date = commentJSON.data[j].Date;
                                                            var cmt = commentJSON.data[j].Comment;

                                                            var dateOfcmt = Date.parse(date);
                                                            diff2 = currentTime - dateOfcmt;
                                                            diff2 = diff2 / 1000 / 60 / 60 / 24;
                                                            var DateString2;
                                                            DateString2 = postDateCmt();

                                                            var comment = "<div class='Thecomment'><span style='display: none'><span class='commentID'>" + id + "</span>" + " | </span>"  +
                                                                "<b><span style='cursor: pointer;color: blue;font-size: medium' class='usernameComment' onclick='goToUser($(this).html())'>" + user + "</span></b>" +
                                                                "&nbsp&nbsp&nbsp" + cmt + "&nbsp&nbsp&nbsp&nbsp&nbsp" + "<span><span style='color: darkgray;text-align: right;'>" + DateString2 + "</span>" +
                                                                "&nbsp&nbsp&nbsp" + "<a style='' class='tools deleteComment' onclick='deleteComment(" + id + ")'><img style='width: 20px;height: 20px' src='img/icons/trash.png'></a>" +
                                                                "<a style='' class='tools editComment' onclick='editComment(" + i + ")'><img style='width: 20px;height: 20px' src='img/icons/edit.png'></a>" +
                                                                "<br><p style='padding: 0'></p></span></div>";
                                                            //alert(pid);
                                                            if (pid == userJSON.data[i].id) {
                                                                //console.log(comment + " - " + pid);
                                                                result2[i] += comment;
                                                                result2[i] = result2[i].replace("No Comments", "");
                                                            }
                                                        }

                                                        result2[i] +=
                                                            "</div>" +
                                                            "<textarea class='typeComment' onkeydown=\"SendCommentData(" + userJSON.data[i].id + ")\" placeholder='Type Comment' rows=\"1\" class=\"typeComment\"></textarea>" +
                                                            "</div>" +
                                                            "</div>" +
                                                            "</div>" +
                                                            "</div>" +
                                                            "</div>";
                                                    }
                                                    else {
                                                        result2.push(
                                                            "<div style=\"text-align: center; margin: -5px;padding: -5px\" class=\"row TopicNo\">" +
                                                            "<div style=\"\" class=\"panel panel-primary\">" +
                                                            "<div class=\"\">" +
                                                            "</div>" +
                                                            "<div class=\"panel-body\" style='padding-top: -5px'>" +
                                                            "<div class=\"col-md-2\" style=\"padding: -5px;\">" +
                                                            "<div class=\"sidebar\" style=\"padding-top:10px; padding-bottom:3px; padding-left:15px;margin: 3px\">" +
                                                            "<p style='cursor: pointer;' class=\"usernamePost\" onclick='goToUser($(this).html())'>" + userJSON.data[i].User + "</p>" +
                                                            "<p>" + DateString + "</p>" +
                                                            "</div>" +
                                                            "<i align='left' onclick=\"LikeFunction(this)\" class=\"fa fa-thumbs-o-up\"></i>" + userJSON.data[i].Likes +
                                                            "<i align='left' onclick=\"DislikeFunction(this)\" class=\"fa fa-thumbs-o-down\"></i>" + userJSON.data[i].Dislikes +
                                                            "</div>" +
                                                            "<div style=\"padding: -5px;\" class=\"col-md-10 contentover\">" +
                                                            "<div style=\"padding: -5px;text-align: left;\" class=\"col-md-2\">" +
                                                            "<p class='TopicID' style=\"display: inline-block\">" + userJSON.data[i].id + "</p>" +
                                                            "<h3 class='Title' style=\"color: black;\">" + userJSON.data[i].Title + "</h3>" +
                                                            "</div>" +
                                                            "<div style=\"padding: -5px;\" class=\"col-md-10 theBorder\">" +
                                                            "<span class=\"part\">" + trimmedString + "</span>" +
                                                            "<span style=\"display:none;\" class=\"complete\">" + trimmedString + trimmedString2 + "</span>" +
                                                            "<p onclick=\"showMore(" + i + ")\" class=\"more\">more</p>" +
                                                            "<hr style='width: 80%'>" +
                                                            "<p onclick=\"showAllComments(" + i + ")\" class=\"moreComment\">See Comments</p>" +
                                                            "<div class=\"comments\">"
                                                        );

                                                        result2[i] += "No Comments";

                                                        for (var j = 0; j < countComment; j++) {
                                                            var pid = commentJSON.data[j].Pid;
                                                            var id = commentJSON.data[j].id;
                                                            var user = commentJSON.data[j].User;
                                                            var date = commentJSON.data[j].Date;
                                                            var cmt = commentJSON.data[j].Comment;

                                                            var dateOfcmt = Date.parse(date);
                                                            diff2 = currentTime - dateOfcmt;
                                                            diff2 = diff2 / 1000 / 60 / 60 / 24;
                                                            var DateString2;
                                                            DateString2 = postDateCmt();

                                                            if($("#UserN").html().toLowerCase() == user.toLowerCase())
                                                            {
                                                                var comment = "<div class='Thecomment'><span style='display: none'><span class='commentID'>" + id + "</span>" + " | </span>"  +
                                                                    "<b><span style='cursor: pointer;color: blue;font-size: medium' class='usernameComment' onclick='goToUser($(this).html())'>" + user + "</span></b>" +
                                                                    "&nbsp&nbsp&nbsp" + cmt + "&nbsp&nbsp&nbsp&nbsp&nbsp" + "<span><span style='color: darkgray;text-align: right;'>" + DateString2 + "</span>" +
                                                                    "&nbsp&nbsp&nbsp" + "<a style='' class='tools deleteComment' onclick='deleteComment(" + id + ")'><img style='width: 20px;height: 20px' src='img/icons/trash.png'></a>" +
                                                                    "<a style='' class='tools editComment' onclick='editComment(" + i + ")'><img style='width: 20px;height: 20px' src='img/icons/edit.png'></a>" +
                                                                    "<br><p style='padding: 0'></p></span></div>";
                                                            }
                                                            else {
                                                                var comment = "<div class='Thecomment'><span style='display: none'><span class='commentID'>" + id + "</span>" + " | </span>"  +
                                                                    "<b><span style='cursor: pointer;color: blue;font-size: medium' class='usernameComment' onclick='goToUser($(this).html())'>" + user + "</span></b>" +
                                                                    "&nbsp&nbsp&nbsp" + cmt + "&nbsp&nbsp&nbsp&nbsp&nbsp" + "<span><span style='color: darkgray;text-align: right;'>" + DateString2 + "</span>" +
                                                                    "<br><p style='padding: 0'></p></span></div>";
                                                                //alert(pid);
                                                            }
                                                            if (pid == userJSON.data[i].id) {
                                                                //console.log(comment + " - " + pid);
                                                                result2[i] += comment;
                                                                result2[i] = result2[i].replace("No Comments", "");
                                                            }
                                                        }

                                                        result2[i] +=
                                                            "</div>" +
                                                            "<textarea class='typeComment' onkeydown=\"SendCommentData(" + userJSON.data[i].id + ")\" placeholder='Type Comment' rows=\"1\" class=\"typeComment\"></textarea>" +
                                                            "</div>" +
                                                            "</div>" +
                                                            "</div>" +
                                                            "</div>" +
                                                            "</div>";
                                                    }
                                                }
                                            }
                                            return result2;
                                        }();

                                        var options = {
                                            dataSource: sources,
                                            autoHidePrevious: true,
                                            autoHideNext: true,
                                            showGoInput: true,
                                            showGoButton: true,
                                            callback: function (response, pagination) {
                                                var dataHtml = "";
                                                $.each(response, function (index, item) {
                                                    dataHtml += item;
                                                });
                                                container.prev().html(dataHtml);

                                                for (var i = 0; i < count; i++) {
                                                    if ($(".complete").eq(i).text().length < 100) {
                                                        $(".more").eq(i).hide();
                                                    }
                                                    showAllCommentsExist(i);
                                                }
                                                init();
                                                triggerKey();
                                                stopWhenFocus();
                                                focusOut();
                                            }
                                        };
                                        container.pagination(options);
                                    }
                                )('demo1');
                            });
                            //console.log("enabled");
                            //document.getElementById("updateTopics").disabled = false;
                            $('html').animate({
                                scrollTop: parseInt($("#UserContent").offset().top - 100)
                            }, 500);

                            //$("#updateTopics").prop('disabled', false);
                        }
                        else {

                        }
                    }
                }
            };
            xmlhttp.open("POST", "getBoard.php", true);
            xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xmlhttp.send();
        }
    };
    xmlhttp2.open("POST","getComments.php",true);
    xmlhttp2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp2.send();
}

var pid;
function SendCommentData(i)
{
    pid = i;
}

var observe;
if (window.attachEvent) {
    observe = function (element, event, handler) {
        element.attachEvent('on'+event, handler);
    };
}
else {
    observe = function (element, event, handler) {
        element.addEventListener(event, handler, false);
    };
}
function init() {
    var text = document.getElementsByClassName("typeComment");
    var max = text.length;
    for(var i = 0; i < max; i++) {
        function resize() {
            for(var i = 0; i < max; i++) {
                text[i].style.height = 'auto';
                text[i].style.height = text[i].scrollHeight + 'px';
            }
        }
        /* 0-timeout to get the already changed text */
        function delayedResize() {
            window.setTimeout(resize, 0);
        }

        observe(text[i], 'change', resize);
        observe(text[i], 'cut', delayedResize);
        observe(text[i], 'paste', delayedResize);
        observe(text[i], 'drop', delayedResize);
        observe(text[i], 'keydown', delayedResize);

        //text[i].val();
        text[i].focus();
        text[i].select();
        resize();
    }
}


$(document).on('keydown', '.typeComment',function (zEvent) {

    if (zEvent.shiftKey) {
        if (zEvent.shiftKey && zEvent.keyCode == 13) {
        }
    }
    else {
        if (zEvent.keyCode == 13) {
            var comment = $(this).val();
            var user = $("#UserN").html();
            //alert($('.typeComment').index(this));
            var index = $('.typeComment').index(this);

            addComment(comment,pid,user);
            var xmlhttp2 = new XMLHttpRequest();
            xmlhttp2.onreadystatechange = function () {
                if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
                    if (xmlhttp2.responseText.toString() != "not found") {
                        var lastIdComment = xmlhttp2.responseText;
                        lastIdComment = JSON.parse(lastIdComment);
                        var lastID = lastIdComment.last[0].id;
                        lastID = +lastID + 1;

                        if($('.comments').eq(index).html() != "No Comments") {
                            $('.comments').eq(index).append("<div class='Thecomment'><span style='display: none'><span class='commentID'>" + lastID + "</span>" + " | </span>" +
                            "<b><span style='cursor: pointer;color: blue;font-size: medium' class='usernameComment' onclick='goToUser($(this).html())'>" + $("#UserN").html() + "</span></b>" +
                                "&nbsp&nbsp&nbsp" + comment + "&nbsp&nbsp&nbsp&nbsp&nbsp" + "<span><span style='color: darkgray;'>" + "Now" + "</span>" +
                                "&nbsp&nbsp&nbsp" + "<a style='' class='tools deleteComment' onclick='deleteComment(" + lastID + ")'><img style='width: 20px;height: 20px' src='img/icons/trash.png'></a>" +
                                "<a style='' class='tools editComment' onclick='editComment(" + lastID + ")'><img style='width: 20px;height: 20px' src='img/icons/edit.png'></a>" +
                                "<br><p style='padding: 0'></p></span></div>");
                        }
                        else {
                            $('.comments').eq(index).html("<div class='Thecomment'><span style='display: none'><span class='commentID'>" + lastID + "</span>" + " | </span>" +
                                "<b><span style='cursor: pointer;color: blue;font-size: medium' class='usernameComment' onclick='goToUser($(this).html())'>" + $("#UserN").html() + "</span></b>" +
                                "&nbsp&nbsp&nbsp" + comment + "&nbsp&nbsp&nbsp&nbsp&nbsp" + "<span><span style='color: darkgray;'>" + "Now" + "</span>" +
                                "&nbsp&nbsp&nbsp" + "<a style='' class='tools deleteComment' onclick='deleteComment(" + lastID + ")'><img style='width: 20px;height: 20px' src='img/icons/trash.png'></a>" +
                                "<a style='' class='tools editComment' onclick='editComment(" + lastID + ")'><img style='width: 20px;height: 20px' src='img/icons/edit.png'></a>" +
                                "<br><p style='padding: 0'></p></span></div>");
                        }
                    }
                }
            };
            xmlhttp2.open("POST", "getLastComment.php", true);
            xmlhttp2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xmlhttp2.send();

            //addComment(comment,pid,user);
            $(this).val(null);
            return false;
        }
    }
});

function triggerKey()
{
    var e = $.Event('keypress');
    e.keyCode= 69; // enter
    var text = $('.typeComment');
    var max = text.length;
    for(var i = 0; i < max; i++) {
        $('.typeComment').eq(i).trigger(e);
        $('.typeComment').eq(i).css("height","24px");
    }
    //console.log("Done");
}

function stopWhenFocus()
{
    $(document).on('focus', '.typeComment',function() {
        showTopicsAutoStop();
        //console.log("Focus");
    });
}


function focusOut()
{
    $(document).on('focusout', '.typeComment',function() {
        showTopicsAuto();
        //console.log("Focus out");
    });
}

$(document).on('focus', '#TableData tr',function() {
    //console.log("Focus");
});

$(document).on('focusout', '#TableData tr',function() {
    //console.log("Focus Out");
});