<?php
//Módulo para cargar las tapas de los albumes.

//Traemos la cadena de conexión.
include("conexion.php");


if ($cnx) {
    $consulta = "SELECT * FROM artistas";
    $resultado = mysqli_query($cnx, $consulta);
    $datos = mysqli_fetch_all($resultado, MYSQLI_ASSOC);
}else{
    die("Falló la conexión con la base de datos");
}

mysqli_close($cnx);


echo json_encode($datos);


?>