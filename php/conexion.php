<?php
//Módulo para la conexión a la base de datos.

$host = "127.0.0.1";
$user  = "root";
$password = "";
$db = "playme";

$cnx = mysqli_connect($host, $user, $password, $db);
//Establecemos la codificacion de caracteres para la conexión.
mysqli_set_charset($cnx,  "utf8");



?>