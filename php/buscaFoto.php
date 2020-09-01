<?php

//Módulo para la obtención de la foto del usuario.

$dato = "";
$id = $_POST["id"];

include("conexion.php");


if ($cnx) {
    $consulta = "select usu_foto from usuarios where usu_id = '$id'";
    $resultado = mysqli_query($cnx, $consulta );
    if ($resultado) {
        //Verificamos que exista una foto del usuario.
        $foto_existente = mysqli_num_rows($resultado);
        if ($foto_existente > 0) {
            $datos = mysqli_fetch_all($resultado, MYSQLI_ASSOC);
        }else{
            $datos = "nulo";
        }
    }else{
        $datos = "fallo";
    }
}else{
    $dato = "fallo";
}

mysqli_close($cnx);

echo json_encode($datos);

?>