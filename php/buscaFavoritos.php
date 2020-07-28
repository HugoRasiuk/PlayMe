<?php
//Módulo para buscar los favoritos del usuario.


//Variables globales.
$respuesta = array();


$idusuario = $_POST["idusuario"];
$idcanciones = $_POST["idcanciones"];


include("conexion.php");


if ($cnx) {
    for ($i = 0; $i < count($idcanciones); $i+=1) {
        $consulta = "SELECT * FROM favoritas WHERE fav_idusuario = '$idusuario' AND fav_idcancion = '$idcanciones[$i]'";
        $resultado = mysqli_query($cnx, $consulta);
        if (mysqli_num_rows($resultado) > 0) {
            $respuesta[] = $idcanciones[$i];
        };
    };
}else{
    die("fallo");
}


mysqli_close($cnx);


echo json_encode($respuesta);

?>