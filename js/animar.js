"use strict"
//Módulo para la nimaciónde objetos del DOM y el manejo de eventos.

//Variables de usuario.
var miUsuarioId = 0;
var miUsuarioUsuario = "";
var miUsuarioContrasenia = "";


//Formulario.
$(document).ready(function() {
    //Botones del formulario principal.
    $("#btnIngresar").click(function() {
        $(".formularioUsuario").css("visibility", "visible");
        setTimeout(enfocaUsuario, 500);
        $(".banda").css("margin-left", "-25rem");
    })
    $("#btnRegistrarse").click(function() {
        $(".formularioUsuarioRegistro").css("visibility", "visible");
        setTimeout(enfocaUsuarioRegistro, 500);
        $(".banda").css("margin-left", "-25rem");
    })
    //Botones del formulario de registración de usuario.
    $("#btnUsuarioRegistroAnterior").click(function() {
        $(".ingreso").css("visibility", "visible");
        $(".banda").css("margin-left", "0rem");
        setTimeout(enfocaIngreso, 500);
    })
    $("#btnUsuarioRegistroSiguiente").click(function() {
        let valido = "";
        valido = validarUsuario($("#txtUsuarioRegistro").val());
        if (valido == "corto") {
            $(".mensajeUsuarioRegistro").fadeOut(500, usuarioIncorrecto);
            $(".mensajeUsuarioRegistro").fadeIn(500);
        }else{
            if (valido == "no") {
                $(".mensajeUsuarioRegistro").fadeOut(500, usuarioExistente);
                $(".mensajeUsuarioRegistro").fadeIn(500);
            }else{
                if (valido == "ok") {
                    $(".formularioContraseniaRegistro").css("visibility", "visible");
                    setTimeout(enfocaContraseniaRegistro, 500);
                    $(".banda").css("margin-left", "-50rem");
                }else{
                    $(".mensajeUsuarioRegistro").fadeOut(500, errorConexion);
                    $(".mensajeUsuarioRegistro").fadeIn(500);
                }
            }
        }
    })
    //Botones del formulario de usuario.
    $("#btnUsuarioAnterior").click(function() {
        $(".ingreso").css("visibility", "visible");
        $(".banda").css("margin-left", "0rem");
        setTimeout(enfocaIngreso, 500);
    })
    $("#btnUsuarioSiguiente").click(function() {
        let nombre_usuario = $("#txtUsuario").val();
        $.ajax({
            url: "php/buscarDatosUsuario.php",
            type: "POST",
            async: false,
            data: {usuario:nombre_usuario},
            success: function(respuesta) {
                if (respuesta == '"fallo"') {
                    $(".mensajeUsuario").fadeOut(500, mensajeUsuario);
                    $(".mensajeUsuario").fadeIn(500);
                }else{
                    if (respuesta == '"nulo"') {
                        $(".mensajeUsuario").fadeOut(500, mensajeUsuarioInexistente);
                        $(".mensajeUsuario").fadeIn(500);
                    }else{
                        JSON.parse(respuesta, desempaquetarDatosUsuario);
                        $(".formularioContrasenia").css("visibility", "visible");
                        setTimeout(enfocaContrasenia, 500);
                        $(".banda").css("margin-left", "-50rem");
                    }
                }
            }
        })
    
    })
    //Botones del formulario de contraseña al registrarse.
    $("#btnContraseniaRegistroAnterior").click(function() {
        $(".formularioUsuarioRegistro").css("visibility", "visible");
        setTimeout(enfocaUsuarioRegistro, 500);
        $(".banda").css("margin-left", "-25rem");
    })
    $("#btnContraseniaRegistroSiguiente").click(function() {
        let valido = "";
        valido = validarContrasenia($("#txtContraseniaRegistro").val(), $("#txtContraseniaRegistroRepeticion").val());
        if (!valido) {
            $(".mensajeContraseniaRegistro").fadeOut(500, contraseniaIncorrecta);
            $(".mensajeContraseniaRegistro").fadeIn(500);
        }else{
            $(".formularioRecuperarRegistro").css("visibility", "visible");
            setTimeout(enfocaRecuperarRegistro, 500);
            $(".banda").css("margin-left", "-75rem");
        }
    })
    //Botones del formulario de contraseña.
    $("#btnContraseniaAnterior").click(function() {
        $(".formularioUsuario").css("visibility", "visible");
        setTimeout(enfocaUsuario, 500);
        $(".banda").css("margin-left", "-25rem");
    })
    $("#btnOlviveContrasenia").click(function() {
        $(".formularioRecuperar").css("visibility", "visible");
        setTimeout(enfocaRecuperar, 500);
        $(".banda").css("margin-left", "-75rem");
    })
    $("#btnContraseniaSiguiente").click(function() {
        if ($("#txtContrasenia").val() == miUsuarioContrasenia) {
            cerrar();
        }else{
            $(".mensajeContrasenia").fadeOut(500, contraseniaIngresoIncorrecta);
            $(".mensajeContrasenia").fadeIn(500);
        }
    });
    //Botones del formulario de recuperación al registrarse.
    $("#btnRecuperarRegistroAnterior").click(function() {
        $(".formularioContraseniaRegistro").css("visibility", "visible");
        setTimeout(enfocaContraseniaRegistro, 500);
        $(".banda").css("margin-left", "-50rem");
    })
    $("#btnRecuperarRegistroSiguiente").click(function() {
        let valido = "";
        valido = validarOpciones();
        if (valido) {
            //Guardamos los datos y vamos a la aplicación
            guardarDatos();
            if (msj == "La registraciónse realizó con éxito. Ingresando...") {
                setTimeout(cerrar, 500);
            }
        }else{
            $(".mensajeRecuperacionRegistro").fadeOut(500, opcionesIncorrectas);
            $(".mensajeRecuperacionRegistro").fadeIn(500);
        }
    })
    //Botones del formulario de recuperación al ingresar.
    $("#btnRecuperarAnterior").click(function() {
        $(".formularioContrasenia").css("visibility", "visible");
        setTimeout(enfocaContrasenia, 500);
        $(".banda").css("margin-left", "-50rem");
    })
    $("#btnRecuperarSiguiente").click(function() {
        if (verificarExistenciaRespuesta()) {
            validarRespuesta();
        }else{
            $(".iniciorecuperacion").fadeOut(500, avisoFaltaOpcion);
            $(".iniciorecuperacion").fadeIn(500);
        }
    })
    //Input del formulario de recuperación al ingresar.
    $(".opciones input").focus(function() {
        limpiaInput();
        $(this).css({background:"rgb(220, 220, 220)",
                     color:"black"});
    })
    //Input del formulario de recuperación al registrarse.
    $(".opcionesRegistro input").focus(function() {
        chequearInput();
        $(this).css({background:"rgb(220, 220, 220)",
                     color:"black"});
    })
})



function enfocaIngreso() {
    $(".formularioUsuario").css("visibility", "hidden");
    $(".formularioUsuarioRegistro").css("visibility", "hidden");
}

function enfocaUsuario() {
    $("#txtUsuario").focus();
    $(".ingreso").css("visibility", "hidden");
    $(".formularioContrasenia").css("visibility", "hidden");
}

function enfocaContrasenia() {
    $("#txtContrasenia").focus();
    $(".formularioUsuario").css("visibility", "hidden");
    $(".formularioRecuperar").css("visibility" ,"hidden");
}

function enfocaRecuperar() {
    $(".formularioContrasenia").css("visibility", "hidden");
}

function enfocaUsuarioRegistro() {
    $("#txtUsuarioRegistro").focus();
    $(".ingreso").css("visibility", "hidden");
    $(".formularioContraseniaRegistro").css("visibility", "hidden");
}

function enfocaContraseniaRegistro() {
    $("#txtContraseniaRegistro").focus();
    $(".formularioUsuarioRegistro").css("visibility", "hidden");
    $(".formularioRecuperarRegistro").css("visibility" ,"hidden");
}

function enfocaRecuperarRegistro() {
    $(".formularioContraseniaRegistro").css("visibility", "hidden");
}




function chequearInput() {
    $(".opcionesRegistro").find("input").each(function() {
        if ($(this).val().length == 0) {
            $(this).css({background:"rgb(50, 50, 60)",
                         color:"white"});
        }
    })
}

function limpiaInput() {
    $(".opciones").find("input").each(function() {
        $(this).val("");
        $(this).css({background:"rgb(50, 50, 60)",
                         color:"white"});
    })
}



//Funciones de mensajes.
function usuarioIncorrecto() {
    $(".mensajeUsuarioRegistro").text("Debe ingresar un nombre de usuario");
}

function usuarioExistente() {
    $(".mensajeUsuarioRegistro").text("El nombre de usuario que ingresó ya existe, por favor ingrese otro diferente");
}

function errorConexion() {
    $(".mensajeUsuarioRegistro").text("Error alconectar conla base de datos");
}

function contraseniaIncorrecta() {
    $(".mensajeContraseniaRegistro").text("Las contraseñas no coinciden o no es válida, debe tener más de 7 caracteres, minúsculas y mayúsculas y un número como mínimo");
}

function opcionesIncorrectas() {
    $(".mensajeRecuperacionRegistro").text("Debe seleccionar como mínimo 3 opciones");
}
function mensajeUsuario() {
    $(".mensajeUsuario").text("Error en la conexión con la base de datos");
}

function mensajeUsuarioInexistente() {
    $(".mensajeUsuario").text("El usuario ingresado es inexistente");
}

function desempaquetarDatosUsuario(clave, dato_usuario) {
    if (clave == "usu_id") {
       miUsuarioId = dato_usuario;
    }
    if (clave == "usu_usuario") {
        miUsuarioUsuario = dato_usuario;
    }
    if (clave == "usu_contrasenia") {
        miUsuarioContrasenia = dato_usuario;
    }
}

function contraseniaIngresoIncorrecta() {
    $(".mensajeContrasenia").text("La contraseña ingresada no es correcta");
}

function avisoFaltaOpcion() {
    $(".iniciorecuperacion").text("Debe seleccionar una respuesta y completarla para poder recuperar su contraseña");
}



function verificarExistenciaRespuesta() {
    let respuesta = false;
    let cantidad = 0;
    $(".opciones").find("input").each(function() {
        if ($(this).val().length > 0) {
            cantidad++;
        }
    })
    if (cantidad == 1) {
        respuesta = true;
    }
    return respuesta;
}