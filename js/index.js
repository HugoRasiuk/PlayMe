"use strict"
//Módulo para el index

//Variables.
var msj = "";
var miUsuarioId = 0;
var miUsuarioUsuario = "";
var miUsuarioContrasenia = "";

function guardarDatos() {
    //Creamos el array donde se guardarán los datos.
    var opciones = [];
    //Obtenemos los datos para enviar.
    var usuario = $("#txtUsuarioRegistro").val();
    var contrasenia = $("#txtContraseniaRegistro").val();
    //Obtenemos las opciones seleccionadas.
    $(".opcionesRegistro").find("input").each(function() {
        var contenido = $(this).val();
        var id = $(this).attr("id");
        id = Number(id.charAt(1));
        if (contenido.length > 0) {
            opciones.push(id);
            opciones.push(contenido);
        }
    })
    $.ajax({
        url: "php/altaUsuario.php",
        type: "POST",
        async: false,
        data: {usuario:usuario, contrasenia:contrasenia, opciones:opciones},
        success: function(respuesta) {
            miUsuarioUsuario = usuario;
            miUsuarioContrasenia = contrasenia;
            JSON.parse(respuesta, desempaqueta);
            $(".mensajeRecuperacionRegistro").fadeOut(300, function() {
                $(".mensajeRecuperacionRegistro").text(msj);
                $(".mensajeRecuperacionRegistro").fadeIn(300);
             })
         }
    })
}


/**
 * [Desempaqueta los datos]
 *
 * @param   {[integer]}  indice  [indice]
 * @param   {[string]}  valor   [cadena]
 *
 * @return  {[type]}          [void]
 */
function desempaqueta(indice, valor) {
    if (indice == 1) {
        miUsuarioId = valor;
    }
    if (indice == 2) {
        msj = valor;
    }
}



function cerrar() {
    $(".soporte").addClass("soporte_transparente");
    $(".ventana").fadeOut(2000, ingresar);
}

function ingresar() {
    document.cookie = "id=" + miUsuarioId + ";" + "path=../html";
    document.cookie = "usuario=" + miUsuarioUsuario + ";" + "path=../html";
    document.cookie = "contrasenia=" +miUsuarioContrasenia + ";" + "path=../html";
    window.location="html/reproductor.html";
}
