<?php
//Módulo para guardar la foto del usuario.


include("conexion.php");

$respuesta = "fallo";
$usuario = $_POST["usuario"];
$id = $_POST["id"];
$origenFoto = $_FILES["foto"]["tmp_name"];

$destino = "../imagenes/fotos/".$usuario.".jpg";

if (move_uploaded_file($origenFoto, $destino)) {
    //Cambiamos la foto en la base de datos.
    if ($cnx) {
        $consulta = "UPDATE usuarios SET usu_foto = '$destino' WHERE usu_id = '$id';";
        mysqli_query($cnx, $consulta);
        mysqli_close($cnx);
        $respuesta = "ok";
    }
};


echo $respuesta;

?>