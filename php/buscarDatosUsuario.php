<?php
//Módulo para buscar los datos del usuario.

include("conexion.php");

//Variables
$usuario = $_POST["usuario"];


//Verificamos la conexión.
if ($cnx) {
    $consulta = "SELECT * FROM usuarios WHERE usu_usuario = '$usuario'";
    $resultado = mysqli_query($cnx, $consulta);
    $datos = mysqli_fetch_all($resultado, MYSQLI_ASSOC);
    //Verificamos que hay datos y si los hay, los retornamos.
    $cantidad_filas = mysqli_num_rows($resultado);
    if ($cantidad_filas == 0) {
        $datos = "nulo";
    }
}else{
    die("fallo");
}

mysqli_close($cnx);


//Retornamos los datos.
echo json_encode($datos);


?>