"use strict"
//Módulo para las validaciones.


var resultado = "";

function validarUsuario(texto) {
    if (texto.length == 0) {
        resultado = "corto";
    }else{
        $.ajax({
            url: "php/buscaUsuario.php",
            type: "POST",
            async: false,
            data: {usuario:texto},
        })
        .done(function(respuesta) {
            resultado = respuesta;
        }) 
    }
    return resultado;
}





//Validamos la contraseña.
function validarContrasenia(texto, texto_repetido) {
    //Vemos si son iguales.
    if (texto === texto_repetido) {
        //Vemos si tiene más de 7 caracteres.
       if (texto.length > 7) {
            //Vemos si tiene una mayúscula y una minúscula.
            var mayus = false;
            var minus = false;
            for (var indice = 0; indice < texto.length; indice++) {
                var letra = texto.charAt(indice);
                if (letra === letra.toLowerCase() && isNaN(letra)) {
                    minus = true
                }
                if (letra === letra.toUpperCase() && isNaN(letra)) {
                    mayus = true;
                }
            }
            if (mayus && minus) {
                //Verificamos si hay un número en la cadena.
                for (indice = 0; indice < texto.length; indice++) {
                    letra = texto.charAt(indice);
                    if (!isNaN(letra)) {
                        resultado = true;
                    }
                }
            }else{
                resultado = false;
            }
        }else{
            resultado = false;
        }
    }else{
        resultado = false;
    }
    return resultado;
}



function validarOpciones() {
    var resultado = false;
    var cantidad = 0;
    $(".opcionesRegistro").find("input").each(function() {
        if ($(this).val().length != 0) {
            cantidad++;
        }
    })
    if (cantidad >= 3) {
        resultado = true;
    }
    return resultado;
}



function validarRespuesta() {
    //Obtenemos el id de la pregunta y la respuesa ingresada.
    let idRespuesta = 0;
    let respuesta = "";
    $(".opciones").find("input").each(function() {
        if ($(this).val().length > 0) {
            idRespuesta = Number($(this).attr("id"));
            respuesta = $(this).val();
        }
    })
    //Verificamos que coincidan los datos con la base de datos.
    $.ajax({
        url: "php/verificaRecuperacion.php",
        type: "POST",
        async: false,
        data: {id:miUsuarioId, idrespuesta:idRespuesta, respuesta:respuesta},
        success: function(devolucion) {
            if (devolucion == "ok") {
                cambiarContrasenia();
            }else{
                $(".iniciorecuperacion").fadeOut(500, function() {
                    $(".iniciorecuperacion").text(devolucion);
                    $(".iniciorecuperacion").fadeIn(500);
                })
            }
        }
    })
}



function cambiarContrasenia() {
    $(".tituloContrasenia").text("Cambio de contraseña");
    $("#btnContraseniaRegistroAnterior").css("visibility", "hidden");
    $("#btnContraseniaRegistroSiguiente").off("click");
    $(".formularioContraseniaRegistro").on("click", "#btnContraseniaRegistroSiguiente", function() {
        let textoA = $("#txtContraseniaRegistro").val();
        let textoB = $("#txtContraseniaRegistroRepeticion").val();
        if (validarContrasenia(textoA, textoB)) {
            //Reemplazamos la contraseña por la nueva.
            reemplazarContrasenia();
        }else{
            $(".mensajeContraseniaRegistro").fadeOut(500, contraseniaIncorrecta);
            $(".mensajeContraseniaRegistro").fadeIn(500);
        }
    })
    $(".formularioContraseniaRegistro").css("margin-left", "100rem");
    $(".formularioContraseniaRegistro").css("visibility", "visible");
    $(".banda").css("margin-left", "-100rem");
    setTimeout(function() {
        $("#txtContraseniaRegistro").focus();
    }, 500)
}



function reemplazarContrasenia() {
    let nuevaContrasenia = $("#txtContraseniaRegistro").val();
    $.ajax({
        url: "php/cambiaContrasenia.php",
        type: "POST",
        async: false,
        data: {id:miUsuarioId, contrasenia:nuevaContrasenia},
        success: function(respuesta) {
            if (respuesta == "ok") {
                cerrar();
            }else{
                $(".mensajeContraseniaRegistro").fadeOut(500, function() {
                    $(".mensajeContraseniaRegistro").text(respuesta);
                    $(".mensajeContraseniaRegistro").fadeIn(500);
                })
            }
        }
    })
}