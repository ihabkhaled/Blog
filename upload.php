<?php
$valid_extensions = array('jpeg', 'jpg' , 'bmp' , 'gif' , 'png');

$target_dir = "avatars/";
$user = $_POST['username'];
$img = $_FILES["fileToUpload"]["name"];
$tmp = $_FILES["fileToUpload"]["tmp_name"];

$ext = strtolower(pathinfo($img, PATHINFO_EXTENSION));
$target_file = $target_dir . $user . "." . $ext;


$uploadOk = 1;

if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    if($check !== false) {
        $uploadOk = 1;
    } else {
        $uploadOk = 0;
    }
}

if (file_exists($target_file)) {

}

else if ($_FILES["fileToUpload"]["size"] > 5000000) {
    echo "Sorry, your file is too large. \n";
    $uploadOk = 0;
}

else if(!in_array($ext, $valid_extensions)) {
    echo "File extension is not allowed. \n";
    $uploadOk = 0;
}

/*function resize_imagegif($file, $w, $h) {
    list($width, $height) = getimagesize($file);
    $src = imagecreatefromgif($file);
    $dst = imagecreatetruecolor($w, $h);
    imagecopyresampled($dst, $src, 0, 0, 0, 0, $w, $h, $width, $height);
    return $dst;
}*/

/*function resize_imagepng($file, $w, $h) {
    list($width, $height) = getimagesize($file);
    $src = imagecreatefrompng($file);
    $dst = imagecreatetruecolor($w, $h);
    imagecopyresampled($dst, $src, 0, 0, 0, 0, $w, $h, $width, $height);
    return $dst;
}*/

function resize_imagebmp($file, $w, $h) {
    list($width, $height) = getimagesize($file);
    $src = imagecreatefrombmp($file);
    $dst = imagecreatetruecolor($w, $h);
    imagecopyresampled($dst, $src, 0, 0, 0, 0, $w, $h, $width, $height);
    return $dst;
}

function resize_imagejpg($file, $w, $h) {
    list($width, $height) = getimagesize($file);
    $src = imagecreatefromjpeg($file);
    $dst = imagecreatetruecolor($w, $h);
    imagecopyresampled($dst, $src, 0, 0, 0, 0, $w, $h, $width, $height);
    return $dst;
}

if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded. \n";
// if everything is ok, try to upload file
}

else {
    if($ext == "jpg" || $ext == "jpeg")
        $upload = imagejpeg(resize_imagejpg($tmp,100,100), $target_file, 85);

    if($ext == "gif")
    {
        //$upload = imagegif(resize_imagegif($tmp,100,100), $target_file);

        //$image = imagecreatefromgif($tmp);
        //$upload = imagegif($image, $target_file);

        $upload = move_uploaded_file($tmp, $target_file);
    }

    if($ext == "png") {
        $upload = move_uploaded_file($tmp, $target_file);
        //$upload = imagepng($tmp, $target_file);
    }

    if($ext == "bmp")
        $upload = imagebmp(resize_imagebmp($tmp,100,100), $target_file, 50);

    if ($upload) {
        echo "The file uploaded successfully :" . basename($target_file);

        require_once 'config.php';
        $sql3 = "update users set Avatar='$target_file' where username = '$user'";

        if ($conn->query($sql3) === TRUE) {
        } else {
        }

    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}
