var signupV=0;
var loginV=0;
var updateV=0;

function updateview()
{
    if(updateV == 0 ) {

        $('.form').show();
        $('.backform').show();
        $('#updateframe').show();
        $('#signupframe').hide();
        $('#loginframe').hide();

        updateV=1;
        loginV=0;
        signupV=0;

        //updateBack();
    }
    else
    {
        $('.form').hide();
        $('.backform').hide();
        $('#updateframe').hide();
        $('#signupframe').hide();
        $('#loginframe').hide();
        updateV=0;
    }
}

function signup(newUser)
{
    if(signupV === 0 ) {
        $('.form').show();
        $('#signupframe').show();
        $('.backform').show();
        $('#loginframe').hide();
        $('#updateframe').hide();

        signupV=1;
        loginV=0;
        updateV=0;

        if(newUser)
        {
            $("#signupType").html("SignUp");
        }
        else
        {
            $("#signupType").html("AddUser");
        }
        $("#signupType").show();

    }
    else
    {
        $('.form').hide();
        $('#signupframe').hide();
        $('.backform').hide();
        $('#loginframe').hide();
        $('#updateframe').hide();
        $("#signupType").hide();
        signupV=0;
    }

/*    $('html').animate({
        scrollTop: parseInt($(".form").offset().top - 100)
    }, 500);*/
}

function loginview()
{
    if(loginV == 0 ) {
        $('.form').show();
        $('#loginframe').show();
        $('.backform').show();
        $('#signupframe').hide();
        $('#updateframe').hide();
        loginV=1;
        signupV=0;
        updateV=0;

        //loginBack();
    }
    else
    {
        $('.form').hide();
        $('#signupframe').hide();
        $('.backform').hide();
        $('#loginframe').hide();
        $('#updateframe').hide();
        loginV=0;
    }
}

//Get ID by click on Table
function getId()
{
    var value;
    $("#TableData tr").click(function(e) {

        last = document.getElementById('TableData').rows[0].cells.length - 1;
        var cell=$(e.target).closest('td');

        if( cell.index() === last){

        }
        else {

            if (this.rowIndex !== 0) {
                $(this).addClass('selected').siblings().removeClass('selected')
                value = $(this).find('td:eq(1)').html();
                if (value !== "") {
                    getSelectedUser(value);
                }
            }
        }
    });

    $("#TableData tr").focusin(function() {
        console.log("Focus");
    });

    $(document).on('focusout', 'table',function() {
        console.log("Focus Out");
    });
}

//var admin=false;
function getSelectedUser(id)
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            if (xmlhttp.responseText.toString() !== "not found")
            {
                var userJSON = this.responseText;
                userJSON = JSON.parse(userJSON);
                $("#selectedUser").html("ID : " + userJSON.id);
                $("#selectedUser").append("<br>" + "Username : " + userJSON.user);
                $("#selectedUser").append("<br>" + "Full Name : " + userJSON.name);
                $("#selectedUser").append("<br>" + "E-Mail : " + userJSON.email);

                if(userJSON.status === "online") {
                    $("#selectedUser").append("<br>" + "Status : " + "<b><span style='color: green;font-style: oblique;display: inline-block'>" + userJSON.status + "</span></b>");
                }
                else {
                    $("#selectedUser").append("<br>" + "Status : " + "<b><span style='color: red;font-style: oblique;display: inline-block'>" + userJSON.status + "</span></b>");
                }

                if(userJSON.type === "admin")
                {
                    $("#selectedUser").append("<br>" + "User Type : " + userJSON.type);
                }
                else
                {
                    $("#selectedUser").append("<br>" + "User Type : " + "user");
                }
                $("#selectedUser").append("<br>" + "Last Modified : " + userJSON.date);
                d = new Date();
                $("#selectedUser").append("<br>"
                    + "<img class='img-circle' width=\"100\" height=\"100\" src = \""
                    + userJSON.avatar +"?"
                    + d.getTime() +  "\">");
            }
            $(".form").show();
            $(".backform").show();
            $("#selectedUser").show();
        }
    };
    xmlhttp.open("POST","getData.php",true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send("user="+id);
    //xmlhttp.preventDefault();
}

function updateDynamic()
{
    $("#TableData tr").click(function()
    {
        if (this.rowIndex !== 0)
        {
            if (updateV === 1 || updateV !== 1) {
                value = $(this).find('td:eq(1)').html();
                $(".idNo").html(value);
                value = $(this).find('td:eq(2)').html();
                document.getElementById("userUpdate").value = value;
                value = $(this).find('td:eq(3)').html();
                document.getElementById("passUpdate").value = value;
                value = $(this).find('td:eq(4)').html();
                document.getElementById("fullnameUpdate").value = value;
                value = $(this).find('td:eq(5)').html();
                document.getElementById("emailUpdate").value = value;
            }
        }
    });
    updateV=0;
    updateview();

/*    $('html').animate({
        scrollTop: parseInt($(".form").offset().top - 100)
    }, 500);*/
}

function update() {

    validateForm("update");
    if(valid == true) {
        var idd = $(".idNo").html();
        var user = document.getElementById("userUpdate").value;
        var pass = document.getElementById("passUpdate").value;
        var email = document.getElementById("emailUpdate").value;
        var name = document.getElementById("fullnameUpdate").value;

        if ($(".idNo").html() != null && $(".idNo").html() != "") {
            var xmlhttp = new XMLHttpRequest();

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

                    if (xmlhttp.responseText.toString() === "Values Updated successfully") {
                        document.getElementById("btupdate").className = "btn btn-success";

                        document.getElementById("userUpdate").value = null;
                        document.getElementById("passUpdate").value = null;
                        document.getElementById("emailUpdate").value = null;
                        document.getElementById("fullnameUpdate").value = null;
                        refreshTable();
                        done("User data updated successfully");
                    }
                    else {
                        document.getElementById("btupdate").className = "btn btn-danger";
                        alert(xmlhttp.responseText);
                    }
                }
            };
        }

        xmlhttp.open("POST", "update.php", true);
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlhttp.send("user=" + user + "&pass=" + pass + "&email=" + email + "&name=" + name + "&id=" + idd);
        xmlhttp.preventDefault();
    }
}

function deleteDynamic(x)
{
    deleteTheUser(x);
}

function deleteTheUser(idd)
{
    var r = confirm("Are you sure you want to delete user : " + idd);
    //alert(cmid);
    if(r == true) {
        if (idd != null && idd != "") {

            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

                    if (xmlhttp.responseText.toString() == "Values Deleted successfully") {
                        refreshTable();
                        done("User Deleted Successfully");
                    }
                    else {
                        alert(xmlhttp.responseText);
                    }
                }
            };
            xmlhttp.open("POST", "delete.php", true);
            xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xmlhttp.send("idNo=" + idd);
            xmlhttp.preventDefault();
        }
    }
}

function refreshTable()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if (xmlhttp.responseText.toString() !== "not found") {

                document.getElementById("TableData2").innerHTML = this.responseText;

                if ($("#TableData2").html() === $("#TableData3").html()) {

                }
                else {
                    if ($('#TableData').css('display') == 'none') {
                        getData2();
                        document.getElementById("refreshData").className = "btn btn-success";
                    }
                    else {
                        var x = this.responseText;
                        document.getElementById("TableData3").innerHTML = x;
                        //alert("not equal");
/*
                        setTimeout(function () {
                            $('#TableData').DataTable().destroy();
                            document.getElementById("TableData").innerHTML = null;
                            document.getElementById("TableData").innerHTML = x;
                            document.getElementById("TableData3").innerHTML = x;
                            $('#TableData').DataTable();
                            document.getElementById("refreshData").className = "btn btn-success";
                            $(".idNo").html(null);
                        },10,x);*/

                        $('#TableData').DataTable().destroy();

                        x = JSON.parse(x);
                        setTimeout(function () {
                            $('#TableData').html("<thead style=\\\"text-align: center;\\\">\n" +
                                "<tr>\n" +
                                "<th>#</th>\n" +
                                "<th>ID</th>\n" +
                                "<th>Username</th>\n" +
                                "<th>Password</th>\n" +
                                "<th>Fullname</th>\n" +
                                "<th>E-mail</th>\n" +
                                "<th>Type</th>\n" +
                                "<th><a onclick='signup()'><img style='width: 20px;height: 20px' src='img/icons/signup.png'></a></th>\n" +
                                "</tr>\n" +
                                "</thead>");
                            setTimeout(function () {
                                $('#TableData').DataTable({
                                    "data" : x.data,
                                    "columns" : [
                                        { "data" : "X" },
                                        { "data" : "id" },
                                        { "data" : "Username" },
                                        { "data" : "Password" },
                                        { "data" : "Name" },
                                        { "data" : "Email" },
                                        { "data" : "Type" },
                                        { "data" : "Tools" }
                                    ]
                                });
                            },0,x);
                            $("#TableData").slideDown(50);
                            document.getElementById("getdata").className = "btn btn-success";
                        },0,x);

                        //$('#TableData').DataTable();
                        document.getElementById("refreshData").className = "btn btn-success";
                        $(".idNo").html(null);
                    }
                }
            }
            else {
                document.getElementById("getdata").className = "btn btn-danger";
                alert(xmlhttp.responseText);
            }
        }
    };
    xmlhttp.open("POST", "GetTable2.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send();
}

//Make user an Admin
function makeAdmin(x)
{
    makeAdminDone(x);
}

function makeAdminDone(idd)
{
    if(idd != null && idd != "") {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                if (xmlhttp.responseText.toString() !== "not found")
                {
                    var userJSON = this.responseText;
                    userJSON = JSON.parse(userJSON);

                    if(userJSON.type === "admin")
                    {
                        var xmlhttp2 = new XMLHttpRequest();
                        xmlhttp2.onreadystatechange = function() {
                            if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
                                if (xmlhttp2.responseText.toString() === "User")
                                {
                                    done("User changed to Normal User successfully");
                                }
                            }
                        };
                        xmlhttp2.open("POST","makeAdmin.php",true);
                        xmlhttp2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                        xmlhttp2.send("id="+idd+"&admin="+true);
                        event.preventDefault();
                    }
                    else
                    {
                        var xmlhttp2 = new XMLHttpRequest();
                        xmlhttp2.onreadystatechange = function() {
                            if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
                                if (xmlhttp2.responseText.toString() === "Admin")
                                {
                                    done("User changed to Admin successfully");
                                }
                            }
                        };
                        xmlhttp2.open("POST","makeAdmin.php",true);
                        xmlhttp2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                        xmlhttp2.send("id="+idd+"&admin="+false);
                        event.preventDefault();
                    }
                }
            }
        };
        xmlhttp.open("POST","getData.php",true);
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlhttp.send("user="+idd);
        event.preventDefault();
    }
}

function hideTable() {
    $("#TableData").slideUp(50);
    $('#TableData').DataTable().destroy();
    $("#TableDiv").slideUp(50);
    $(".idNo").hide(50);
    //$('#TableData').DataTable();
    document.getElementById("getdata").className = "btn btn-primary";
    document.getElementById("refreshData").className = "btn btn-primary";
    document.getElementById("btlog").className = "btn btn-primary";
    document.getElementById("btsignup").className = "btn btn-primary";
    $('#NameSearch').val("");
}

//Jquery UI Table GetData Function
function getData2()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            if (xmlhttp.responseText.toString() !== "not found") {
                if ($('#TableData').css('display') == 'none') {
                    //showLoading();
                    $("#TableDiv").show();
                    var x = this.responseText;
/*                    setTimeout(function () {
                        document.getElementById("TableData").innerHTML = x;
                        $('#TableData').DataTable();
                        //hideLoading();
                        $("#TableData").slideDown(50);
                        document.getElementById("TableData3").innerHTML = x;
                        document.getElementById("getdata").className = "btn btn-success";
                    },10,x);*/
                    document.getElementById("TableData3").innerHTML = x;
                    $("#TableData").slideDown(50);
                    x = JSON.parse(x);
                    setTimeout(function () {
                        $('#TableData').html("<thead style=\\\"text-align: center;\\\">\n" +
                            "<tr>\n" +
                            "<th>#</th>\n" +
                            "<th>ID</th>\n" +
                            "<th>Username</th>\n" +
                            "<th>Password</th>\n" +
                            "<th>Fullname</th>\n" +
                            "<th>eMail</th>\n" +
                            "<th>Type</th>\n" +
                            "<th><a onclick='signup()'><img style='width: 20px;height: 20px' src='img/icons/signup.png'></a></th>\n" +
                            "</tr>\n" +
                            "</thead>");

                        setTimeout(function () {
                            var data = [];
                            for ( var i=0 ; i<x.data.length ; i++ ) {
                                data.push( [ x.data[i].X, x.data[i].id, x.data[i].Username, x.data[i].Password, x.data[i].Name , x.data[i].Email
                                    , x.data[i].Type , x.data[i].Tools] );
                            }
                            $('#TableData').DataTable( {
                                data:           data,
                                deferRender:    true
                            });
/*                            $('#TableData').DataTable({
                                "data" : x.data,
                                "columns" : [
                                    { "data" : "X" },
                                    { "data" : "id" },
                                    { "data" : "Username" },
                                    { "data" : "Password" },
                                    { "data" : "Name" },
                                    { "data" : "Email" },
                                    { "data" : "Type" },
                                    { "data" : "Tools" }
                                ],
                                deferRender:    true
                            });*/
                        },0,x);
                        //hideLoading();
                        $("#TableData").slideDown(50);
                        //document.getElementById("TableData3").innerHTML = x;
                        document.getElementById("getdata").className = "btn btn-success";
                    },0,x);
                }
                else {
                    hideTable();
                }
            }
            else {
                document.getElementById("getdata").className = "btn btn-danger";
                alert(xmlhttp.responseText);
            }
        }
    };
    xmlhttp.open("POST", "GetTable2.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send();
}

var interval;
//auto refresh
function start()
{
    interval = setInterval(function(){refreshTable()}, 5000);
}

function Stop()
{
    clearInterval(interval);
}

function login()
{
    var user = document.getElementById("usernamelog").value;
    var pass = document.getElementById("passwordlog").value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            if (xmlhttp.responseText.toString() !== "User not found") {
                document.getElementById("btlog").className = "btn btn-success";
                document.getElementById("usernamelog").value = null;
                document.getElementById("passwordlog").value = null;
                $("#UserSideData").show();
                getUser(user);
                loginV = 1;
                loginview();
                checkAllAuto();
                showTopicsAuto();
                refreshTopics();
                //$("#UserN").html(user);

            }
            else
            {
                $("#loginError").html("");
                document.getElementById("btlog").className = "btn btn-danger";
                alert(xmlhttp.responseText);
            }
        }
    };
    xmlhttp.open("POST","login.php",true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send("user=" + user + "&pass=" + pass);
    //xmlhttp.preventDefault();
}

var valid = false;
function validateForm(type){

    if(type == "signup") {
        var usernameRegex = /^[a-zA-Z0-9._]{2,15}$/;
        var fullnameRegex = /^[a-zA-Z\s]{2,50}$/;

        var username = document.getElementById('usernamein').value;
        var fullname = document.getElementById('fullnamein').value;

        var validateUser = usernameRegex.test(username);
        var validateName = fullnameRegex.test(fullname);

        if (username != null) {
            if (validateUser == false) {
                $("#signupError").html("Username should only contains ( letters numbers . _ ) with min 2 and max 15 character");
                $("#usernamein").focus();
                valid = false;
            }
            else {
                if (validateName == false) {
                    $("#signupError").html("Full Name should be only letters with min 2 and max 50 character");
                    $("#usernamein").focus();
                    valid = false;
                }
                else {
                    $("#signupError").html();
                    valid = true;
                }
            }
        }
    }
    else if (type == "update")
    {
        var usernameRegex = /^[a-zA-Z0-9._]{2,15}$/;
        var fullnameRegex = /^[a-zA-Z\s]{2,50}$/;

        var username = document.getElementById('userUpdate').value;
        var fullname = document.getElementById('fullnameUpdate').value;

        var validateUser = usernameRegex.test(username);
        var validateName = fullnameRegex.test(fullname);

        if (username != null) {
            if (validateUser == false) {
                $("#updateError").html("Username should only contains ( letters numbers . _ ) with min 2 and max 15 character");
                $("#userUpdate").focus();
                valid = false;
            }
            else {
                if (validateName == false) {
                    $("#updateError").html("Full Name should be only letters with min 2 and max 50 character");
                    $("#fullnameUpdate").focus();
                    valid = false;
                }
                else {
                    $("#updateError").html();
                    valid = true;
                }
            }
        }
    }
}

//SignUp
function send(newUser) {
    validateForm("signup");

    if(valid == true) {
        var user = document.getElementById("usernamein").value;
        var pass = document.getElementById("passwordin").value;
        var email = document.getElementById("emailin").value;
        var name = document.getElementById("fullnamein").value;

        if (newUser === "AddUser") {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    if (xmlhttp.responseText.toString() === "Values Inserted successfully") {
                        document.getElementById("btsignup").className = "btn btn-success";
                        document.getElementById("usernamein").value = null;
                        document.getElementById("passwordin").value = null;
                        document.getElementById("emailin").value = null;
                        document.getElementById("fullnamein").value = null;
                        refreshTable();
                        done("User data inserted successfully");
                    }
                    else {
                        document.getElementById("btsignup").className = "btn btn-danger";
                    }
                }
            };
            xmlhttp.open("POST", "insert.php", true);
            xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xmlhttp.send("user=" + user + "&pass=" + pass + "&email=" + email + "&name=" + name);
            xmlhttp.preventDefault();
        }

        //login after signup
        else {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    if (xmlhttp.responseText.toString() === "Values Inserted successfully") {
                        document.getElementById("btsignup").className = "btn btn-success";

                        xmlhttp.onreadystatechange = function () {
                            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

                                if (xmlhttp.responseText.toString() !== "User not found") {
                                    document.getElementById("btlog").className = "btn btn-success";
                                    $("#UserSideData").show();
                                    $("#loginBtn").hide();
                                    $(".sidenav").show();
                                    done("You Signed up successfully");
                                    getUser(user);
                                    checkAllAuto();
                                    showTopicsAuto();
                                    //$("#UserN").html(user);
                                }
                                else {
                                    $("#loginError").html("");
                                    document.getElementById("btlog").className = "btn btn-danger";
                                    alert(xmlhttp.responseText);
                                }
                            }
                        };
                        xmlhttp.open("POST", "login.php", true);
                        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                        xmlhttp.send("user=" + user + "&pass=" + pass);
                        xmlhttp.preventDefault();

                        document.getElementById("usernamein").value = null;
                        document.getElementById("passwordin").value = null;
                        document.getElementById("emailin").value = null;
                        document.getElementById("fullnamein").value = null;
                    }
                    else {
                        document.getElementById("btsignup").className = "btn btn-danger";
                    }
                }
            };
            xmlhttp.open("POST", "insert.php", true);
            xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xmlhttp.send("user=" + user + "&pass=" + pass + "&email=" + email + "&name=" + name);
            xmlhttp.preventDefault();
        }
    }
}

function changePassword()
{

}

function search()
{
    var name = document.getElementById("NameSearch").value;
    if(document.getElementById("NameSearch").value != null) {

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                if (xmlhttp.responseText.toString() !== "Not found") {
                    document.getElementById("TableData").innerHTML = this.responseText;
                    $('#TableData').DataTable().destroy();
                    if ($('#TableData').css('display') == 'none') {
                        $("#TableDiv").show(500);
                        $("#TableData").show(500);
                    }
                    $('#TableData').DataTable();
                }
                else {
                    document.getElementById("TableData").innerHTML = this.responseText;
                    $('#TableData').DataTable().destroy();
                    $('#TableData').DataTable();
                }
            }
        };
        xmlhttp.open("POST", "search.php", true);
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlhttp.send("user=" + name);
        xmlhttp.preventDefault();
    }
}

//Logout Function
function logout()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            goOffline();
            Stop();
            $("#usernameNav a").html(null);
            $(".usernameCont").html(null);
            $("#usernameWelcomeSide").html(null);
            $("#AllContent").hide();
            $("#AdminContent").hide();
            $("#UserContent").hide();
            $("#loginBtn").show();
            $("#UserSideData").hide();
            $(".sidenav").hide();
            $("#UserN").html(null);

            updateV = 1;
            updateview();

            signupV = 1;
            signup();

            loginV = 1;
            loginview();

            hideTable();
            onlineStop();
            checkAllAutoStop();
            showTopicsAutoStop();

            var request = '/';
            cache.delete(request).then(function() {
            });
        }
    };
    xmlhttp.open("POST","logout.php",true);
    xmlhttp.send();
    xmlhttp.preventDefault();
}

//Check Login Session Function
var session = "";
function CheckSession()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onloadend = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            session = xmlhttp.responseText;
            if (session !== "the session is empty")
            {
                $("#usernameNav a").html("Welcome " + session);
                $(".usernameCont").html("Welcome " + session);
                $("#UserN").html(session);
                getUser();
                $("#UserSideData").show();
                checkAllAuto();
                showTopicsAuto();
                refreshTopics();
            }
            else
            {
                $(".sidenav").hide();
                $("#loginBtn").show();
                $("#AllContent").hide();
                $("#AdminContent").hide();
                $("#UserContent").hide();
            }
        }
    };
    xmlhttp.open("POST","session.php",true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send();
    //xmlhttp.preventDefault();
}

//Check Login Session
$(document).ready(function() {
    CheckSession();

    $('#frameOfMenu').height($(document).height());
    $('#frameOfMenu').width($(document).width());
    document.getElementById("frameOfMenu").style.display = "none";
    //$("#updateTopics").prop('disabled', true);
    setTimeout(function()
    {
        $('.lazyLoadPage').fadeOut(500);
    },100);
});

//TESTING
function marginNavbar() {
    w = window.innerWidth;
    if(w < 768)
    {

    }
}

$("#Logo").click(function(){
    var w = document.documentElement.scrollWidth;
    var c = parseInt($("#TheNavBar").css("left")) * -1;

    if(c === 0)
    {
        $("#TheNavBar").animate({left: '-=100%'},250);
    }
    else if(c === w)
    {
        $("#TheNavBar").animate({left: '+=100%'},250);
    }
});

$(window).resize(function()
{
    //$("#MyFooter").css('bottom','0');
    //alert("resized");
});


function showframe()
{
    document.getElementById("frameOfMenu").style.display = "block";
}
function hideframe()
{
    document.getElementById("frameOfMenu").style.display = "none";
}

//Get User Data
function getUser(theUser)
{
    if (theUser) {
    }
    else
    {
        theUser = session;
    }
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            if (xmlhttp.responseText.toString() !== "not found")
            {
                getOnline();
                var userJSON = this.responseText;
                userJSON = JSON.parse(userJSON);

                $("#usernameNav a").html("Welcome " + userJSON.user);
                $(".usernameCont").html("Welcome " + userJSON.user);
                $("#UserN").html(userJSON.user);
                goOnline();
                onlineStart();
                $("#usernameWelcomeSide").append("ID : " + userJSON.id);
                $("#usernameWelcomeSide").append("<br>" + "Username : " + userJSON.user);
                $("#usernameWelcomeSide").append("<br>" + "Full Name : " + userJSON.name);
                $("#usernameWelcomeSide").append("<br>" + "E-Mail : " + userJSON.email);
                $("#AllContent").show();

                if(userJSON.type === "admin")
                {
                    $("#UserType").html(userJSON.type);
                    refreshTable();
                    $("#AdminContent").show();
                    $("#UserContent").show();
                    $("#loginBtn").hide();
                    $(".sidenav").show();
                    start();
                }
                else
                {
                    $("#UserType").html("user");
                    $("#UserContent").show();
                    $(".sidenav").show();
                    $("#loginBtn").hide();
                }
                d = new Date();
                $("#TheAvatar").attr("src",userJSON.avatar + "?"+d.getTime());
            }
            else
            {
                logout();
            }
        }
    };
    xmlhttp.open("POST","getData.php",true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send("user="+theUser);
    //xmlhttp.preventDefault();
}

//POPUP Centered FORMS
//Click outside Hide
$(".backform").click(function(e) {
    if(e.target !== $(".form")) {
        $(".form").hide();
        $(".backform").hide();
        $("#selectedUser").hide();
        $("#TextDone p").html(null);

        $("#addTopic").hide();
        $("#editTopic").hide();
        $("#features").hide();

        updateV = 1;
        updateview();

        signupV = 1;
        signup();

        loginV = 1;
        loginview();
    }
});

$(".form span").click(function(e) {
    $(".form").hide();
    $(".backform").hide();
    $("#selectedUser").hide();
    $("#TextDone p").html(null);

    $("#addTopic").hide();
    $("#editTopic").hide();
    $("#features").hide();

    updateV = 1;
    updateview();

    signupV = 1;
    signup();

    loginV = 1;
    loginview();
});

//Done Message Form
function done(msg)
{
    $(".form").show();
    $(".backform").show();
    $("#signupframe").hide();
    $("#updateframe").hide();
    $("#TextDone p").html(msg);
    $("#TextDone").show();
    $("#TextDone p").show();

    setTimeout(function () {
        $(".form").fadeOut(1000);
        $(".backform").fadeOut(1000);
        $("#DoneText").fadeOut(1000);
        $("#TextDone p").html(null);
        $("#TextDone").fadeOut();
        $("#TextDone p").fadeOut();
    }, 2500);
}

function features()
{
    $(".form").show();
    $(".backform").show();
    $("#signupframe").hide();
    $("#updateframe").hide();
    $("#Features").css('font-size','medium').css('text-align','left');
    $("#Features iframe")[0].contentDocument.write("- Animated flexible collapsing Navbar<br>" +
        "- Login & Logout with Session & Cookies<br>" +
        "- User Types (Admin & Normal)<br>" +
        "- Signup as Normal User<br>" +
        "- Admin Panel (Add, Update, Delete, Search, Promote, Block)<br>" +
        "- Validation on username, fullname & email<br>" +
        "- Sidebar with User Data<br>" +
        "- Upload Avatar<br>" +
        "- Dynamically generated Data Table<br>" +
        "- Auto refresh Data Table<br>" +
        "- Who's Online<br>" +
        "- Auto check User Availability<br>" +
        "- Auto check Admin Permissions<br>" +
        "- Show all details about selected user<br>" +
        "- Discussion Board Topics<br>" +
        "- Add,Edit & Delete Topics<br>" +
        "- Auto Refresh Topics<br>" +
        "- Click on username who posted the topic to get User Data<br>"
    );
    document.close();
    $("#features").show();
}
//Auto Refresh online table


//Hide Logo on Scroll in fixed navbar
$(document).ready(function (){
    window.onscroll = function() {scrollFunction()};
});

function loadScrollLogo()
{
    window.onscroll = function() {scrollFunction()};
}

function scrollFunction() {
    var w = $(document).width();
    //alert(w);
    if(w <= 767)
    {
        if (document.documentElement.scrollTop >= 50)
        {
            $("#Logo").hide();
        }
        else {
            $("#Logo").show();
        }
    }
    else
    {
        if (document.documentElement.scrollTop >= 50)
        {
            $("#Logo").show();
            $("#TheNavBar").css("opacity","0.6");
        }
        else
        {
            $("#Logo").show();
            $("#TheNavBar").css("opacity","1");
        }
    }
}

//Online Function
function goOnline()
{
    if($(".usernameCont").html() != "") {
        var theUser = $(".usernameCont").html();
        theUser = theUser.substr(theUser.indexOf(' ') + 1, theUser.length - 1);

        $.ajax({
            type: "POST",
            url: "online.php",
            data: 'user=' + theUser + '&avail=' + 'online',
            cache: false,
            success: function (data) {
            }
        });
    }
}

function goOffline()
{
    if($(".usernameCont").html() != "")
    {
        var theUser = $(".usernameCont").html();
        theUser = theUser.substr(theUser.indexOf(' ') + 1, theUser.length - 1);

        $.ajax({
            type: "POST",
            url: "online.php",
            data: 'user=' + theUser + '&avail=' + 'offline',
            cache: false,
            success: function (data) {
            }
        });
    }
}

window.onbeforeunload  = function() {
    goOffline();
};


function getOnline()
{
    //$(".onlineUsers").html(null);
    $.ajax({
        type: "POST",
        url: "getOnline.php",
        cache: false,
        success: function (data) {
            var userJSON = data;
            var usersOnline = "";
            if (data === "Empty")
            {
                usersOnline = null;
                $(".onlineUsers").html(usersOnline);
            }
            else {
                userJSON = JSON.parse(userJSON);
                for (i = 0; i < userJSON.user.length; i++) {
                    if (i == userJSON.user.length - 1) {
                        usersOnline += userJSON.user[i];
                    }
                    else {
                        usersOnline = usersOnline + userJSON.user[i] + " , ";
                    }
                }
                if (usersOnline != $(".onlineUsers").html())
                {
                    $(".onlineUsers").html(usersOnline);
                }
            }
        }
    });
}

statistics();
function statistics()
{
    $.ajax({
        type: "POST",
        url: "statistics.php",
        cache: false,
        success: function (data) {
            var statJSON = data;
            statJSON = JSON.parse(statJSON);
            $("#countUsers").html(statJSON['users']);
            $("#countPosts").html(statJSON['posts']);
            $("#countCmnts").html(statJSON['comments']);
        }
    });

    $.ajax({
        type: "POST",
        url: "topUsers.php",
        cache: false,
        success: function (data) {
            var statJSON = data;
            statJSON = JSON.parse(statJSON);
            $("#TopPosters").html("");
            $("#TopTopics").html("");
            $("#TopCommenters").html("");

            //Top publishers
            var poster = statJSON.posters.length;
            var T1 = "<table align=\"center\"><tr><th>#</th><th>User</th><th>Posts</th></tr>";
            for(var i = 0; i<poster;i++) {
                T1+= "<tr><td>"+ (+i+1) +"</td><td><span style='cursor: pointer;' class=\"usernameComment\" onclick='goToUser($(this).html())'>"+ statJSON.posters[i]['user'] +"</span></td><td>"+ statJSON.posters[i]['psts'] +"</td></tr>";
                //$("#TopPosters").append(+i+1 + " " + statJSON.posters[i]['user'] + " - " + statJSON.posters[i]['psts'] + "<br>");
            }
            T1+= "</table>";
            $("#TopPosters").html(T1);

            //Top Commenters
            T1 = "<table align=\"center\"><tr><th>#</th><th>User</th><th>Comments</th></tr>";
            var comments = statJSON.comments.length;
            for(var i = 0; i<comments;i++) {
                T1+= "<tr><td>"+ (+i+1) +"</td><td><span style='cursor: pointer;' class=\"usernameComment\" onclick='goToUser($(this).html())'>"+ statJSON.comments[i]['user'] +"</span></td><td>"+ statJSON.comments[i]['cmts'] +"</td></tr>";
                //$("#TopCommenters").append(+i+1 + " " + statJSON.comments[i]['user'] + " - " + statJSON.comments[i]['cmts'] + "<br>");
            }
            T1+= "</table>";
            $("#TopCommenters").html(T1);

            //Top Topics
            T1 = "<table align=\"center\"><tr><th>#</th><th>Post</th><th>Comments</th></tr>";
            var posts = statJSON.posts.length;
            for(var i = 0; i<posts;i++) {
                T1+= "<tr><td>"+ (+i+1) +"</td><td>"+ statJSON.posts[i]['post'].substring(0, 30) +"</td><td>"+ statJSON.posts[i]['cmts'] +"</td></tr>";
                //$("#TopTopics").append(+i+1 + " " + statJSON.posts[i]['post'] + " - " + statJSON.posts[i]['cmts'] + "<br>");
            }
            T1+= "</table>";
            $("#TopTopics").html(T1);

            //Most Recent
            T1 = "<table align=\"center\"><tr><th>#</th><th>Post</th><th>Days</th></tr>";
            var recent = statJSON.recent.length;
            var d = new Date();
            //alert(d.getTime());
            for(var i = 0; i<recent;i++) {
                var dt = new Date(statJSON.recent[i]['date']);
                var date = Math.round((d-dt)/(1000*60*60*24));
                //alert(date);
                //alert(dt.getTime());
                T1+= "<tr><td>"+ (+i+1) +"</td><td>"+ statJSON.recent[i]['post'].substring(0, 30) +"</td><td>"+ date +"</td></tr>";
            }
            T1+= "</table>";
            $("#MostRecent").html(T1);
        }
    });
}

var interval2;
//auto Online refresh
function onlineStart()
{
    interval2 = setInterval(function(){getOnline();goOnline();}, 5000);
}

function onlineStop()
{
    clearInterval(interval2);
}

//Check all user's permissions and availability
function checkAll()
{
    checkMe();
    checkAdmin();
    statistics();
}

var interval4;
function showTopicsAuto()
{
    //interval4 = setInterval(function(){showTopics()}, 5000);
}

function showTopicsAutoStop()
{
    clearInterval(interval4);
}

//Check User Available
function checkMe()
{
    var username = $("#UserN").html();
    var exist=false;

    $.ajax({
        type: "POST",
        url: "check.php",
        data: 'user=' + username+'&type=available',
        cache: false,
        success: function (data) {
            if (data === "not found") {exist=false;}
            else {exist = true;}

            if(exist === true) {}
            else {
                logout();
            }
        }
    });
}

//Check Admin Availablity
function checkAdmin()
{
    var username = $("#UserN").html();
    var admin=false;

    $.ajax({
        type: "POST",
        url: "check.php",
        data: 'user=' + username+'&type=admin',
        cache: false,
        success: function (data) {
            if (data === "admin") {admin=true;}
            else {admin = false;}


            if($("#UserType").html() === "user" && admin===true)
            {
                done("You've been promoted to admin user");
                $("#UserType").html("admin");
                $("#AdminContent").show();
                $("#UserContent").show();
                $("#loginBtn").hide();
                $(".sidenav").show();
                start();
            }
            else if($("#UserType").html() === "admin" && admin===false)
            {
                done("You've returned to regular user");
                hideTable();
                $("#AdminContent").hide();
                $("#UserType").html("user");
                $("#UserContent").show();
                $(".sidenav").show();
                $("#loginBtn").hide();
                stop();
            }
            else if($("#UserType").html() === "user" && admin===false)
            {
                //do nothing
            }
            else if($("#UserType").html() === "admin" && admin===true)
            {
                //do nothing
            }
        }
    });
}

var interval3;
function checkAllAuto()
{
    interval3 = setInterval(function(){checkAll()}, 5000);
}

function checkAllAutoStop()
{
    clearInterval(interval3);
}


//Add Topic

function addTopic() {
        var user = $("#UserN").html();
        var title = document.getElementById("title").value;
        var content = document.getElementById("content").value;

        if(user == "" || title == "" || content == "")
        {}
        else {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    if (xmlhttp.responseText.toString() === "Values Inserted successfully") {
                        document.getElementById("btAddTopic").className = "btn btn-success";
                        document.getElementById("title").value = null;
                        document.getElementById("content").value = null;
                        $("#addTopic").hide();
                        done("Post Done");
                        refreshTopics();
                    }
                    else {
                        alert(xmlhttp.responseText);
                        document.getElementById("btAddTopic").className = "btn btn-danger";
                    }
                }
            };
            xmlhttp.open("POST", "addTopic.php", true);
            xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xmlhttp.send("user=" + user + "&title=" + title + "&content=" + content);
        }
    }

function editTopic(i) {
    //validateForm("topic");
    //if(valid == true) {
    //alert(i);
    var id = $("#postID").html();
    var title = document.getElementById("title2").value;
    var content = document.getElementById("content2").value;

    if(id == "" || title == "" || content == "")
    {}
    else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                if (xmlhttp.responseText.toString() === "Values Updated successfully") {
                    document.getElementById("btEditTopic").className = "btn btn-success";
                    document.getElementById("title2").value = null;
                    document.getElementById("content2").value = null;
                    $(".TopicNo h4").eq(i).html(title);
                    $(".complete").eq(i).html(content);
                    $("#editTopic").hide();
                    done("Post Edited");
                    document.getElementById("btEditTopic").className = "btn btn-primary";
                }
                else {
                    alert(xmlhttp.responseText);
                    document.getElementById("btEditTopic").className = "btn btn-danger";
                }
            }
        };
        xmlhttp.open("POST", "editTopic.php", true);
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlhttp.send("id=" + id + "&title=" + title + "&content=" + content);
    }
}

    function showTopic()
    {
        $('.form').toggle();
        $('.backform').toggle();
        $("#addTopic").toggle();
        //$('#userPosting').html($("#UserN").html());
    }


    //Add Comment

//var lastIdComment;
function addComment(comment,pid,user) {
    if(user == "" || comment == "" || pid == "")
    {}
    else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                if (xmlhttp.responseText.toString() === "Values Inserted successfully") {
                    document.getElementById("btAddTopic").className = "btn btn-success";
                    $("#addTopic").hide();
                    done("Comment Done");
                }
                else {
                    //alert(xmlhttp.responseText);
                    document.getElementById("btAddTopic").className = "btn btn-danger";
                }
            }
        };
        xmlhttp.open("POST", "addComment.php", true);
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlhttp.send("user=" + user + "&comment=" + comment + "&pid=" + pid);
    }
}

function showLoading()
{
    $(".loading").css('display','block');
    $('.backform').css('display','block');
}

function hideLoading()
{
    $(".loading").css('display','none');
    $('.backform').css('display','none');
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $('#profilepic').attr('src', e.target.result);
            $(".profilePic").css('display','block');
        };
        reader.readAsDataURL(input.files[0]);
        //showLoading();
    }
}

function shrink(input) {
    var reader = new FileReader(); // init a file reader
    var file = input.files[0]; // get file from input

    reader.onloadend = function(){
        var image = document.createElement('img');
        image.src = reader.result;
        image.onload = function() {
            // shrink image
            var w = image.width;
            var h = image.height;

            var canvas = document.createElement('canvas');
            canvas.width = w * 25/100;
            canvas.height = h * 25/100;

            var ctx = canvas.getContext('2d');
            //ctx.scale(50, 50);

            ctx.drawImage(image,0,0, w * 25/100, h * 25/100);
            var shrinked = canvas.toDataURL('image/jpeg');
/*            $('#profilepic').css('width', canvas.width + "px");
            $('#profilepic').css('height', canvas.height + "px");
            $('#profilepic').attr('src', shrinked);
            $(".profilePic").css('display', 'block');*/
            //console.log(shrinked);
        };
    };
    reader.readAsDataURL(file);
}

$("#fileToUpload").change(function() {
    shrink(this);
    showLoading();
});

function diss() {
    //$("#updateTopics").prop('disabled', true);
    console.log($.active);
    if($.active == 0) {
        refreshTopics();
    }
}