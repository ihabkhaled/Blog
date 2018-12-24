$(document).ready(function (e) {
    $("#uploadFile").on('submit',(function(e) {

        /*var img = document.createElement("IMG");
        img.src = "img/"+"Loading_icon.gif";*/
        var theUser = $(".usernameCont").html();
        theUser = theUser.substr(theUser.indexOf(' ')+1, theUser.length-1);
        $("#UserNameToUpload").val(theUser);
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "upload.php",
            data: new FormData(this),
            contentType: false,
            cache: false,
            processData:false,
            beforeSend : function()
            {
                /*document.getElementById('loading').appendChild(img);
                $('#loading img').css('width','80px');
                $('#loading img').css('height','80px');*/
                //
            },
            success: function(data)
            {
                //alert(data);
                if(data.includes("The file uploaded successfully :") === true)
                {
                    d = new Date();
                    hideLoading();
                    data = data.substr(data.indexOf(':')+1, data.length-1);
                    $("#TheAvatar").attr("src","avatars/"+data+"?"+d.getTime());
                    $('#ResetB').click();
                    $('#submitAvatar').css('display','none');
                    $('#TheFileBut2').css('display','block');
                }
                else
                {
                    alert(data);
                    $('#submitAvatar').css('display','none');
                    $('#TheFileBut2').css('display','block');
                    document.getElementById('loading').removeChild(img);
                }
            },
            error: function (data) {
                //alert(data);
            }
        });
    }));
});
