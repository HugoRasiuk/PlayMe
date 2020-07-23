<?php
//Módulo para el cambio de la nueva contraseña del usuario.
include("conexion.php");


//Variables.
$id = $_POST["id"];
$contrasenia = $_POST["contrasenia"];
$respuesta = "";


if ($cnx) {
    $consulta = "UPDATE usuarios SET usu_contrasenia = '$contrasenia' WHERE usu_id = '$id'";
    mysqli_query($cnx, $consulta);
    $respuesta = "ok";
}else{
    $respuesta = "Error al conectar con la base de datos";
}

mysqli_close($cnx);
echo $respuesta;
