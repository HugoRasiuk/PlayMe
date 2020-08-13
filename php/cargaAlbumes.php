<?php
//Módulo paa la carga de los albumes.

//Cargamos la conexión.
include("conexion.php");


$consulta = $_POST["cadena"];


//Verificamos si se establece la conexión.
if ($cnx) {
    $resultado = mysqli_query($cnx, $consulta);
    $datos = mysqli_fetch_all($resultado, MYSQLI_ASSOC);
}else{
    $datos = "fallo";
}

mysqli_close($cnx);

echo json_encode($datos);

?>