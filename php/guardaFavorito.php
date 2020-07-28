<?php
//Módulo para guardar la selección de favoritos.


$idusuario = $_POST["idusuario"];
$idcancion = $_POST["idcancion"];


include("conexion.php");


if ($cnx) {
    $consulta = "INSERT INTO favoritas (fav_idusuario, fav_idcancion) VALUES ('$idusuario', '$idcancion')";
    mysqli_query($cnx, $consulta);
}else{
    die("fallo");
}

mysqli_close($cnx);


?>