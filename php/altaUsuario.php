<?php
//Módulo para el alta de los nuevos usuarios.

//Desactivamos los mensajes predeterminados de php.
error_reporting(0);

//Traemos la cadena
include("conexion.php");

//Variables que recibimos del formulario.
$usuario = $_POST["usuario"];
$contrasenia = $_POST["contrasenia"];
$opciones = $_POST["opciones"];

$mensaje = "";



if ($cnx) {
    $consulta = "INSERT INTO usuarios (usu_usuario, usu_contrasenia) VALUES ('$usuario', '$contrasenia')";
    //Insertamos los datos del usuario.
    if (mysqli_query($cnx, $consulta)) {
        //Insertamos las opciones.
        //Obtenemos el id del último registro insertado.
        $id_usuario = mysqli_insert_id($cnx);
         for ($indice = 0; $indice < count($opciones); $indice+=2) {
             $indice2 = $indice + 1;
             $consulta = "INSERT INTO respuestas (res_idpregunta, res_texto, res_idusuario) VALUES ('$opciones[$indice]', '$opciones[$indice2]', '$id_usuario')";
             mysqli_query($cnx, $consulta);
         }
         $mensaje = "La registraciónse realizó con éxito. Ingresando...";
    }else{
        $mensaje = "Error al guardar los datos";
    }
}else{
   $mensaje = "Error en la conexión";
}


//Cerramos la conexión.
mysqli_close($cnx);


//Preparamos los datos para ser enviados.
$datosEnvio = [];
$datosEnvio[1] = $id_usuario;
$datosEnvio[2] = $mensaje;

echo json_encode($datosEnvio);

?>