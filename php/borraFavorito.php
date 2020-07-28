<?php
//Módulo para borrar el favorito.


$idusuario = $_POST["idusuario"];
$idcancion = $_POST["idcancion"];


include("conexion.php");



if ($cnx) {
    $consulta = "DELETE FROM favoritas WHERE fav_idusuario = '$idusuario' AND fav_idcancion = '$idcancion'";
    mysqli_query($cnx, $consulta);
}else{
    die("fallo");
}

mysqli_close($cnx);

?>