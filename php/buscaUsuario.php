<?php
//Módulo para buscar si existe el usuarion ingresado.

//Abrimos la conexión con la base de datos.
include("conexion.php");

$usuario = $_POST["usuario"];


//variables.
$mensaje = "";

//Verificamos la conexión.
if ($cnx) {
    $consulta = "SELECT * FROM usuarios WHERE usu_usuario = '$usuario'";
    $resultado = mysqli_query($cnx, $consulta);
     $cantidad_filas = mysqli_num_rows($resultado);
     if ($cantidad_filas == 0) {
        $mensaje = "ok";
     }else{
      $mensaje = "no";
     }
}else{
    die("fallo");
}


//Cerramos la conexión.
mysqli_close($cnx);


echo $mensaje;

?>