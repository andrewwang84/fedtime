<?php
    include"config.php";
    $pid=$_SESSION['uID'];

    $uid= mysqli_real_escape_string($_POST["uid"]);
    $c_num= mysqli_real_escape_string($_POST["c_num"]);
    $start_t= mysqli_real_escape_string($_POST["start_t"]);
    $cost= mysqli_real_escape_string($_POST["cost"]);
    $loc_city= mysqli_real_escape_string($_POST["loc_city"]);
    $loc= mysqli_real_escape_string($_POST["loc"]);
    $phone= mysqli_real_escape_string($_POST["phone"]);
    $tags= mysqli_real_escape_string($_POST["tags"]);
    $s_else= mysqli_real_escape_string($_POST["s_else"]);
    $end_t='$start_t'+120;

    $sql = "INSERT INTO `shop` (`hid`, `c_num`, `start_t`, `end_t`, `cost`, `loc`, `loc_city`, `phone`, `tags`, `s_else`) values ('".$pid."', '".$c_num."', '".$start_t."', '".$end_t."', '".$cost."', '".$loc."', '".$loc_city."', '".$phone."', '".$tags."', '".$s_else."');";
    mysqli_query($conn,$sql) or die("MySQL query error");
?>