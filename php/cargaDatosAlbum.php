<?php
//Módulo para la búsqueda de los datos del album.

$consulta = $_POST["cadena"];


//Traemos la conexión.
include("conexion.php");


if ($cnx) {
    $resultado = mysqli_query($cnx, $consulta);
    $datos = mysqli_fetch_all($resultado, MYSQLI_ASSOC);
}else{
    die("Fallo en la conexión");
}


mysqli_close($cnx);

echo json_encode($datos);


?>