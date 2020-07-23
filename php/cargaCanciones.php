<?php
//Módulo para cargar el array de canciones


$id = $_POST["id"];


//Incluímos la conexión.
include("conexion.php");


if ($cnx) {
    $consulta = "SELECT * FROM canciones WHERE can_idalbum = '$id'";
    $resultado = mysqli_query($cnx, $consulta);
    $datos = mysqli_fetch_all($resultado, MYSQLI_ASSOC);
}else{
    die("fallo")
}

mysqli_close($cnx);

echo json_encode($datos);

?>