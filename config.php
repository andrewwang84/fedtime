<?php
    session_start();
    if(!isset($_SESSION["uID"])){
        header("Refresh:0.1;url=index.html");
    }
    $host = 'localhost';
    $user = 'myid';
    $pass = '12345';
    $db = 'happyfarm';
    $conn = mysqli_connect($host, $user, $pass,$db) or die('Error with MySQL connection'); //��MyMSQL�s�u�õn�J
    mysqli_query($conn,"SET NAMES utf8"); //��ܽs�X
    //mysql_select_db($db, $conn); //��ܸ�Ʈw
?>