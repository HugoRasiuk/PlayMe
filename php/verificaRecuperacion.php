<?php
//Módulo para la verificación de los datos de recuperación de la contraseña.

include("conexion.php");


//variables.
$mensaje = "";
$id = $_POST["id"];
$idrespuesta = $_POST["idrespuesta"];
$respuesta = $_POST["respuesta"];



if ($cnx) {
    $consulta = "SELECT * FROM respuestas WHERE res_idusuario = '$id' AND res_idpregunta = '$idrespuesta'";
    $resultado = mysqli_query($cnx, $consulta);
    if (mysqli_num_rows($resultado) > 0) {
        $datos = mysqli_fetch_assoc($resultado);
        if ($datos["res_texto"] == $respuesta) {
            $mensaje = "ok";
        }else{
            $mensaje = "La respuesta ingresada no coincide";
        }
    }
}else{
    $mensaje = "Error en la conexión con la base de datos";
}

mysqli_close($cnx);
echo $mensaje;

?>