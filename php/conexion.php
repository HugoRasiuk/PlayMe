<?php
//Módulo para la conexión a la base de datos.

$host = "localhost";
$user  = "escuel28_hugo";
$password = "&Y[XX5(t]e0Y";
$db = "escuel28_hugo";

$cnx = mysqli_connect($host, $user, $password, $db);
//Establecemos la codificacion de caracteres para la conexión.
mysqli_set_charset($cnx,  "utf8");



?>