"use strict";
//Reproductor del sitio.


//Instanciamos los objetos.
const USUARIO = new Usuario();
const ALBUM = new Album();
const ARTISTA = new Artista();
const CANCION = new Cancion();


//Variables globales.
var bucle = false;
var id_album = [];
var nombre_album = [];
var foto_album = [];
var artista_album = [];
var indice_album = 0;
//Constante para el media.
var media;
//Variables para los temporizadores.
var tiempo_fadeout = 500;
var tiempo_fadein = 500;



//Inicializamos la aplicación.
$(document).ready(function() {
    //Relacionamos la etiqueta audio con la constante.
    media = document.getElementById("media");
    //Establecemos el volumen.
    media.volume = 0.8;
    $("#btnDeslizadorVolumen").val(0.8);
    ALBUM.media = media;
    CANCION.media = media;
    //Asignamos la posición de la barra de desplazamiento del reproductor.
    $("#barra_tiempo").val(0);
    //obtenemos los datos de la cookie y los mostramos.
    extraerDatosCookie();
    mostrarDatosUsuario();
    //cadena para la consulta de los datos.
    let consulta = "SELECT alb_id, alb_nombre, alb_foto, art_nombre from albumes " +
                    "INNER JOIN canciones_albumes " +
                    "ON albumes.alb_id = canciones_albumes.cal_idalbum " +
                    "INNER JOIN canciones_artistas " +
                    "ON canciones_albumes.cal_idcancion = canciones_artistas.car_idcancion " +
                    "INNER JOIN artistas " +
                    "ON canciones_artistas.car_idartista = artistas.art_id " +
                    "group by alb_id " +
                    "ORDER BY alb_nombre" + ";";
    //Cargamos las imágenes de las tapas de los albumes.
    cargaAlbumes(consulta);
    muestraAlbumes();
    //Cargamos las animaciones.
    cargaAnimaciones();
    //Asociamos los eventos de las tapas de los albumes.
     $(".tapa").click(function() {
         cargarAlbumSeleccionado($(this).attr("id"));
         limpiarListaCanciones()
         mostrarListaCanciones();
         ALBUM.indice = 0;
         ALBUM.asignarCancion();
         $("#btnPlay_img").attr("src", "../imagenes/Botones/Play.png");
         $("#btnPlay_img").attr("alt", "Botón de play");
         $("#barra_tiempo").val(0);
  });
     $("#btnPlay").click(function() {
         if (!media.paused && !media.ended) {
            CANCION.pausar();
            $("#btnPlay_img").attr("src", "../imagenes/Botones/Play.png");
            $("#btnPlay_img").attr("alt", "Botón de play");
        }else{
            if (ALBUM.checkListaCargada()) {
                CANCION.reproducir();
                $("#btnPlay_img").attr("src", "../imagenes/Botones/Pausa.png");
                $("#btnPlay_img").attr("alt", "Botón de pausa");
                $("#" + String(ALBUM.indice)).css("color", "red");
                $(".info__artista").text(ALBUM.canciones[ALBUM.indice].artista);
            }
        }
     });
     $("#btnParar").click(function() {
         CANCION.detenerCancion();
         $("#btnPlay_img").attr("src", "../imagenes/Botones/Play.png");
         $("#btnPlay_img").attr("alt", "Botón de play");
  });
     $("#btnSiguienteReproductor").click(function() {
         if (media.src != "") {
             if (ALBUM.siguienteCancion()) {
                 CANCION.reproducir();
                $("#btnPlay_img").attr("src", "../imagenes/Botones/Pausa.png");
                $("#btnPlay_img").attr("alt", "Botón de pausa");
                $("#" + String(ALBUM.indice - 1)).css("color", "rgb(220, 220, 255)");
                $("#" + String(ALBUM.indice)).css("color", "red");
                $(".info__artista").text(ALBUM.canciones[ALBUM.indice].artista);
             }
         }
    });
    $("#btnAnteriorReproductor").click(function() {
        if (media.src != "") {
            if (ALBUM.anteriorCancion()) {
                CANCION.reproducir();
               $("#btnPlay_img").attr("src", "../imagenes/Botones/Pausa.png");
               $("#btnPlay_img").attr("alt", "Botón de pausa");
               $("#" + String(ALBUM.indice + 1)).css("color", "rgb(220, 220, 255)");
               $("#" + String(ALBUM.indice)).css("color", "red");
               $(".info__artista").text(ALBUM.canciones[ALBUM.indice].artista);
            }
        }
    });
    $("#btnAdelantar").click(function() {
        CANCION.adelantar();
    });
    $("#btnRetroceder").click(function() {
        CANCION.retroceder();
    });
    $("#btnMute").click(function() {
        if (media.muted) {
            CANCION.silencioSonido();
            $("#btnMute_img").attr("src", "../imagenes/Botones/Mute.png");
            $("#btnMute_img").attr("alt", "Botón de silenciar");
        }else{
            CANCION.silencioSonido();
            $("#btnMute_img").attr("src", "../imagenes/Botones/Sonido.png");
            $("#btnMute_img").attr("alt", "Botón de habilitar sonido");
        }
    });
    $("#btnLoop").click(function() {
        if (media.loop) {
            media.loop = false;
            $("#btnLoop_img").attr("src", "../imagenes/Botones/Loop.png");
            $("#btnLoop_img").attr("alt", "Botón de loop");
        }else{
            media.loop = true;
            $("#btnLoop_img").attr("src", "../imagenes/Botones/No_loop.png");
            $("#btnLoop_img").attr("alt", "Botón de quitar loop");
        }
    });
    $("#btnSiguiente").click(function() {
        //Evaluamos si estamos fuera del rango.
        if (!(indice_album >= id_album.length)) {
            let albumes_restantes = id_album.length - indice_album;
            //Evaluamos si quedan como mínimo 12 albumes por mostrar.
            if (albumes_restantes > 11) {
                muestraAlbumes();
            }else{
                //Establecemos el índice para que complete los 12 albumes en pantalla.
                indice_album = id_album.length - 12;
                muestraAlbumes();
            }

        }
    });
    $("#btnAnterior").click(function() {
        if (indice_album >= 24) {
            indice_album -= 24;
            muestraAlbumes();
        }else{
            if (indice_album > 12) {
                indice_album = 0;
                muestraAlbumes();
            }
        }
    });
    ///Eventos click de los filtros.
    $("#btnFiltroCancion").click(function() {
        //Quitamos los demás filtros de la pantalla.
        $("#btnFiltroArtista").fadeOut(tiempo_fadeout);
        $("#btnFiltroAlbum").fadeOut(tiempo_fadeout);
        $("#btnFiltroFavoritos").fadeOut(tiempo_fadeout);
        $("#btnFiltroRecomendados").fadeOut(tiempo_fadeout);
        $("#btnFiltroGeneral").fadeOut(tiempo_fadeout);
        setTimeout(function() {
            $(".filtro__txt").css("display", "inline-block");
            $("#txtFiltro").focus();
            $("#txtFiltro").keydown(function(tecla) {
                if (tecla.which == "13") {
                }
                if (tecla.which == "27") {
                    //Devolvemos los filtros a la pantalla
                    $(".filtro__txt").css("display", "none");
                    $("#btnFiltroCancion").removeClass("filtro_posicion_izquierda");
                    if ($("#btnFiltroArtista").hasClass("filtro__artista_nueva_posicion")) {
                        $("#btnFiltroCancion").addClass("filtro__canciones_nueva_posicion");
                    }
                    $("#btnFiltroArtista").fadeIn(tiempo_fadeout);
                    $("#btnFiltroAlbum").fadeIn(tiempo_fadeout);
                    $("#btnFiltroFavoritos").fadeIn(tiempo_fadeout);
                    $("#btnFiltroRecomendados").fadeIn(tiempo_fadeout);
                    $("#btnFiltroGeneral").fadeIn(tiempo_fadeout);
                }
            });
        }, 500);
        setTimeout(function() {
            $("#btnFiltroCancion").removeClass("filtro__canciones_nueva_posicion");
            $("#btnFiltroCancion").addClass("filtro_posicion_izquierda");
        }, 500)
    });
    $("#btnFiltroArtista").click(function() {
        //Quitamos los demás filtros de la pantalla.
        $("#btnFiltroCancion").fadeOut(tiempo_fadeout);
        $("#btnFiltroAlbum").fadeOut(tiempo_fadeout);
        $("#btnFiltroFavoritos").fadeOut(tiempo_fadeout);
        $("#btnFiltroRecomendados").fadeOut(tiempo_fadeout);
        $("#btnFiltroGeneral").fadeOut(tiempo_fadeout);
        setTimeout(function() {
            $(".filtro__txt").css("display", "inline-block");
            $("#txtFiltro").focus();
            $("#txtFiltro").keydown(function(tecla) {
                if (tecla.which == "13") {
                }
                if (tecla.which == "27") {
                    //Devolvemos los filtros a la pantalla
                    $(".filtro__txt").css("display", "none");
                    $("#btnFiltroArtista").removeClass("filtro_posicion_izquierda");
                    if ($("#btnFiltroAlbum").hasClass("filtro__album_nueva_posicion")) {
                        $("#btnFiltroArtista").addClass("filtro__artista_nueva_posicion");
                    }
                    $("#btnFiltroCancion").fadeIn(tiempo_fadeout);
                    $("#btnFiltroAlbum").fadeIn(tiempo_fadeout);
                    $("#btnFiltroFavoritos").fadeIn(tiempo_fadeout);
                    $("#btnFiltroRecomendados").fadeIn(tiempo_fadeout);
                    $("#btnFiltroGeneral").fadeIn(tiempo_fadeout);
                }
            });
        }, 1000);
        setTimeout(function() {
            $("#btnFiltroArtista").removeClass("filtro__artista_nueva_posicion");
            $("#btnFiltroArtista").addClass("filtro_posicion_izquierda");
        }, 500)
    });
    $("#btnFiltroAlbum").click(function() {
        //Quitamos los demás filtros de la pantalla.
        $("#btnFiltroCancion").fadeOut(tiempo_fadeout);
        $("#btnFiltroArtista").fadeOut(tiempo_fadeout);
        $("#btnFiltroFavoritos").fadeOut(tiempo_fadeout);
        $("#btnFiltroRecomendados").fadeOut(tiempo_fadeout);
        $("#btnFiltroGeneral").fadeOut(tiempo_fadeout);
        setTimeout(function() {
            $(".filtro__txt").css("display", "inline-block");
            $("#txtFiltro").focus();
            $("#txtFiltro").keydown(function(tecla) {
                if (tecla.which == "13") {
                }
                if (tecla.which == "27") {
                    //Devolvemos los filtros a la pantalla
                    $(".filtro__txt").css("display", "none");
                    $("#btnFiltroAlbum").removeClass("filtro_posicion_izquierda");
                    if ($("#btnFiltroArtista").hasClass("filtro__artista_nueva_posicion")) {
                        $("#btnFiltroAlbum").addClass("filtro__album_nueva_posicion");
                    }
                    $("#btnFiltroCancion").fadeIn(tiempo_fadeout);
                    $("#btnFiltroArtista").fadeIn(tiempo_fadeout);
                    $("#btnFiltroFavoritos").fadeIn(tiempo_fadeout);
                    $("#btnFiltroRecomendados").fadeIn(tiempo_fadeout);
                    $("#btnFiltroGeneral").fadeIn(tiempo_fadeout);
                }
            });
        }, 1000);
        setTimeout(function() {
            $("#btnFiltroAlbum").removeClass("filtro__album_nueva_posicion");
            $("#btnFiltroAlbum").addClass("filtro_posicion_izquierda");
        }, 500)
    });
    $("#btnFiltroFavoritos").click(function() {
        //Quitamos los demás filtros de la pantalla.
        $("#btnFiltroCancion").fadeOut(tiempo_fadeout);
        $("#btnFiltroArtista").fadeOut(tiempo_fadeout);
        $("#btnFiltroAlbum").fadeOut(tiempo_fadeout);
        $("#btnFiltroRecomendados").fadeOut(tiempo_fadeout);
        $("#btnFiltroGeneral").fadeOut(tiempo_fadeout);
        setTimeout(function() {
            $(".filtro__txt").css("display", "inline-block");
            $("#txtFiltro").focus();
            $("#txtFiltro").keydown(function(tecla) {
                if (tecla.which == "13") {
                }
                if (tecla.which == "27") {
                    //Devolvemos los filtros a la pantalla
                    $(".filtro__txt").css("display", "none");
                    $("#btnFiltroFavoritos").removeClass("filtro_posicion_izquierda");
                    if ($("#btnFiltroAlbum").hasClass("filtro__album_nueva_posicion")) {
                        $("#btnFiltroFavoritos").addClass("filtro__favoritos_nueva_posicion");
                    }
                    $("#btnFiltroCancion").fadeIn(tiempo_fadeout);
                    $("#btnFiltroArtista").fadeIn(tiempo_fadeout);
                    $("#btnFiltroAlbum").fadeIn(tiempo_fadeout);
                    $("#btnFiltroRecomendados").fadeIn(tiempo_fadeout);
                    $("#btnFiltroGeneral").fadeIn(tiempo_fadeout);
                }
            });
        }, 1000);
        setTimeout(function() {
            $("#btnFiltroFavoritos").removeClass("filtro__favoritos_nueva_posicion");
            $("#btnFiltroFavoritos").addClass("filtro_posicion_izquierda");
        }, 500)
    });
    $("#btnFiltroRecomendados").click(function() {
        //Quitamos los demás filtros de la pantalla.
        $("#btnFiltroCancion").fadeOut(tiempo_fadeout);
        $("#btnFiltroArtista").fadeOut(tiempo_fadeout);
        $("#btnFiltroAlbum").fadeOut(tiempo_fadeout);
        $("#btnFiltroFavoritos").fadeOut(tiempo_fadeout);
        $("#btnFiltroGeneral").fadeOut(tiempo_fadeout);
        setTimeout(function() {
            $(".filtro__txt").css("display", "inline-block");
            $("#txtFiltro").focus();
            $("#txtFiltro").keydown(function(tecla) {
                if (tecla.which == "13") {
                }
                if (tecla.which == "27") {
                    //Devolvemos los filtros a la pantalla
                    $(".filtro__txt").css("display", "none");
                    $("#btnFiltroRecomendados").removeClass("filtro_posicion_izquierda");
                    if ($("#btnFiltroAlbum").hasClass("filtro__album_nueva_posicion")) {
                        $("#btnFiltroRecomendados").addClass("filtro__sugeridos_nueva_posicion");
                    }
                    $("#btnFiltroCancion").fadeIn(tiempo_fadeout);
                    $("#btnFiltroArtista").fadeIn(tiempo_fadeout);
                    $("#btnFiltroAlbum").fadeIn(tiempo_fadeout);
                    $("#btnFiltroFavoritos").fadeIn(tiempo_fadeout);
                    $("#btnFiltroGeneral").fadeIn(tiempo_fadeout);
                }
            });
        }, 1000);
        setTimeout(function() {
            $("#btnFiltroRecomendados").removeClass("filtro__sugeridos_nueva_posicion");
            $("#btnFiltroRecomendados").addClass("filtro_posicion_izquierda");
        }, 500)
    });
    $("#btnFiltroGeneral").click(function() {
        //Quitamos los demás filtros de la pantalla.
        $("#btnFiltroCancion").fadeOut(tiempo_fadeout);
        $("#btnFiltroArtista").fadeOut(tiempo_fadeout);
        $("#btnFiltroAlbum").fadeOut(tiempo_fadeout);
        $("#btnFiltroFavoritos").fadeOut(tiempo_fadeout);
        $("#btnFiltroRecomendados").fadeOut(tiempo_fadeout);
        setTimeout(function() {
            $(".filtro__txt").css("display", "inline-block");
            $("#txtFiltro").focus();
            $("#txtFiltro").keydown(function(tecla) {
                if (tecla.which == "13") {
                }
                if (tecla.which == "27") {
                    //Devolvemos los filtros a la pantalla
                    $(".filtro__txt").css("display", "none");
                    $("#btnFiltroGeneral").removeClass("filtro_posicion_izquierda");
                    if ($("#btnFiltroAlbum").hasClass("filtro__album_nueva_posicion")) {
                        $("#btnFiltroGeneral").addClass("filtro__filtro_nueva_posicion");
                    }
                    $("#btnFiltroCancion").fadeIn(tiempo_fadeout);
                    $("#btnFiltroArtista").fadeIn(tiempo_fadeout);
                    $("#btnFiltroAlbum").fadeIn(tiempo_fadeout);
                    $("#btnFiltroFavoritos").fadeIn(tiempo_fadeout);
                    $("#btnFiltroRecomendados").fadeIn(tiempo_fadeout);
                }
            });
        }, 1000);
        setTimeout(function() {
            $("#btnFiltroGeneral").removeClass("filtro__filtro_nueva_posicion");
            $("#btnFiltroGeneral").addClass("filtro_posicion_izquierda");
        }, 500)
    });
    //Evento al cambiar el deslizador del volumen.
    $("#btnDeslizadorVolumen").change(function() {
        media.volume = $("#btnDeslizadorVolumen").val();
    });
    //Evento al terminar la reproducción de la canción.
    media.addEventListener("ended", function() {
        if (!ALBUM.siguienteCancion()) {
            $("#btnPlay_img").attr("src", "../imagenes/Botones/Play.png");
            $("#btnPlay_img").attr("alt", "Botón de play");
        }else{
            CANCION.reproducir();
            $("#" + String(ALBUM.indice - 1)).css("color", "rgb(220, 220, 255)");
            $("#" + String(ALBUM.indice)).css("color", "red");
        }
        
    })
    //Evento al cambiar el tiempo de reproducción de la canción.
    media.addEventListener("timeupdate", function() {
        let duracion = media.duration;
        $("#barra_tiempo").attr("max", duracion);
        let tiempo_actual = media.currentTime;
        $("#barra_tiempo").val(tiempo_actual);
        duracion = convierteTiempo(duracion);
        tiempo_actual = convierteTiempo(tiempo_actual);
        if (duracion == "NaN:NaN") {
            duracion = "00:00";
        }
        if (tiempo_actual == "NaN:NaN") {
            tiempo_actual = "00:00";
        }
        let cadena = tiempo_actual + " de " + duracion;
        $("#barra_texto").text(cadena);
    })
    //Evento al cambiar el deslizador del tiempo de reproducción.
    $("#barra_tiempo").change(function() {
        media.currentTime = $("#barra_tiempo").val();
    });
})



function convierteTiempo(_tiempo) {
    let cadena = "";
    let segundos_totales = Math.floor(_tiempo);
    let minutos = Math.floor(segundos_totales / 60);
    let parte_decimal = segundos_totales / 60 - minutos;
    let segundos = Math.round(parte_decimal * 60);
    segundos = String(segundos);
    if (segundos.length == 1) {
        segundos = "0" + segundos;
    }
    minutos = String(minutos);
    if (minutos.length == 1) {
        minutos = "0" + minutos;
    }
    cadena = minutos + ":" + segundos; 
    return cadena;
}



//Mostramos las canciones en la tabla de HTML.
function  mostrarListaCanciones() {
    let tamanio = ALBUM.canciones.length;
    let tabla = document.getElementById("tabla_canciones");
    let texto;
    let imagen;
    for (let i = 0; i < tamanio; i++) {
        let fila = document.createElement("tr");
        for (let j = 1; j <= 2; j++) {
            let celda = document.createElement("td");
            if (j == 1) {
                celda.setAttribute("id", "estrella" + String(i));
                imagen = document.createElement("img");
                imagen.setAttribute("class", "estrella_lista");
                imagen.setAttribute("id", String(ALBUM.canciones[i].id) * (-1));
                imagen.src = "../imagenes/Estrella_negra.png";
                imagen.alt = "Estrella de favorito para " + ALBUM.canciones[i].nombre;
                texto = imagen;
            }else{
                if (j == 2) {
                    celda.setAttribute("id", String(i));
                    celda.setAttribute("class", "cancion");
                    texto = document.createTextNode(ALBUM.canciones[i].nombre);
                }
            }
            celda.appendChild(texto);
            fila.appendChild(celda);
            tabla.appendChild(fila);
        }
    }
    //Verificamos si existen canciones favoritas dentro de la lista del album seleccionado.
    let idcanciones = [];
    for (let i = 0; i < ALBUM.canciones.length; i++) {
        idcanciones.push(ALBUM.canciones[i].id);
    }
    $.ajax({
        url: "../php/buscaFavoritos.php",
        type: "POST",
        async: false,
        data: {idusuario:USUARIO.id, idcanciones},
        success: function(respuesta) {
            JSON.parse(respuesta, function(clave, valor) {
                if (!isNaN(valor)) {
                    let id = (Number(valor) * 1) * (-1);
                    $("#" + id).addClass("rellena");
                    $("#" + id).attr("src", "../imagenes/Estrella_roja.png");
                }
            });
        }
    });
    //Asignamos las funciones al hacer click sobre las estrellas.
    $(".estrella_lista").click(function() {
        if ($(this).hasClass("rellena")) {
            let id_cancion = Number($(this).attr("id") * (-1));
            $.ajax({
                url: "../php/borraFavorito.php",
                type: "POST",
                data: {idusuario:USUARIO.id, idcancion:id_cancion}
            });
            $(this).attr("src", "../imagenes/Estrella_negra.png");
            $(this).removeClass("rellena");
        }else{
            //Guardamos en la base de datos el favorito.
            let id_cancion = Number($(this).attr("id") * (-1));
            $.ajax({
                url: "../php/guardaFavorito.php",
                type: "POST",
                data: {idusuario:USUARIO.id, idcancion:id_cancion}
            });
            $(this).attr("src", "../imagenes/Estrella_roja.png");
            $(this).addClass("rellena");
        }
    });
    //Asignamos las funciones al hacer click sobre la canción.
    $(".cancion").click(function() {
        $("#" + ALBUM.indice).css("color", "rgb(220, 220, 255)");
        ALBUM.indice = $(this).attr("id");
        ALBUM.asignarCancion();
        CANCION.reproducir();
        $(this).css("color", "red");
        $("#btnPlay_img").attr("src", "../imagenes/Botones/Pausa.png");
       $("#btnPlay_img").attr("alt", "Botón de pausa");
    });
}



function cargarAlbumSeleccionado(_id) {
    ALBUM.id = _id;
    //Obtenemos los datos.
    let consulta = "SELECT alb_id, alb_nombre, alb_foto, alb_aniolanzamiento, art_nombre FROM albumes " +
                   "INNER JOIN canciones_albumes " +
                   "ON albumes.alb_id = canciones_albumes.cal_idalbum " +
                   "INNER JOIN canciones_artistas " +
                   "ON canciones_albumes.cal_idcancion = canciones_artistas.car_idcancion " +
                   "INNER JOIN artistas " +
                   "ON canciones_artistas.car_idartista = artistas.art_id " +
                   "WHERE alb_id = " + String(_id) + ";";
    $.ajax({
        url: "../php/cargaDatos.php",
        type: "POST",
        async: false,
        data: {cadena:consulta},
        success: function(respuesta) {
            JSON.parse(respuesta, function(clave, valor) {
                if (clave == "alb_nombre") {
                    ALBUM.nombre = valor;
                }
                if (clave == "alb_foto") {
                    ALBUM.foto = valor;
                }
                if (clave == "alb_aniolanzamiento") {
                    ALBUM.anio_lanzamiento = valor;
                }
                if (clave == "art_nombre") {
                    ALBUM.artista = valor;
                }
            });
        }
    })
    //Mostramos los datos del album.
    $(".info__imagen").attr("src", ALBUM.foto);
    $(".info__imagen").attr("alt", "Imagén de" + ALBUM.artista + ", " + ALBUM.nombre);
    $(".info__artista").text(ALBUM.artista);
    $(".info__album").text(ALBUM.nombre);
    $(".info__anio").text(ALBUM.anio_lanzamiento);
    //Cargamos la lista de canciones.
    //Arrays para los datos obtenidos.
    let id = [];
    let nombre = [];
    let url = [];
    let artista = [];
    consulta = "SELECT can_id, can_nombre, can_url, art_nombre FROM canciones_albumes " +
               "INNER JOIN canciones " +
               "ON canciones_albumes.cal_idcancion = canciones.can_id " +
               "INNER JOIN canciones_artistas " +
               "ON canciones.can_id = canciones_artistas.car_idcancion " +
               "INNER JOIN artistas " +
               "ON canciones_artistas.car_idartista = artistas.art_id " +
               "WHERE cal_idalbum = " + String(ALBUM.id) + ";";
    $.ajax({
        url: "../php/cargaDatos.php",
        type: "POST",
        async: false,
        data: {cadena:consulta},
        success: function(respuesta) {
            JSON.parse(respuesta, function(clave, valor) {
                if (clave == "can_id") {
                    id.push(valor);
                }
                if (clave == "can_nombre") {
                    nombre.push(valor);
                }
                if (clave == "can_url") {
                    url.push(valor);
                }
                if (clave == "art_nombre") {
                    artista.push(valor);
                }
            })
            //Eliminamos de memoria todos los objetos cancion anteriores y vaciamos el array.
            for (let i = 0; i < ALBUM.canciones.length; i++) {
                delete ALBUM.canciones[i];
            }
            ALBUM.canciones = [];
            //Instanciamos los objetos cancion y los asignamos a la propiedad canciones del objeto album.
            for (let i = 0; i < nombre.length; i++) {
                const CANCION = new Cancion();
                CANCION.id = id[i];
                CANCION.nombre = nombre[i];
                CANCION.url = url[i];
                CANCION.artista = artista[i];
                ALBUM.canciones.push(CANCION);
            }
        }
    })
}



function limpiarListaCanciones() {
    let tabla = document.getElementById("tabla_canciones");
    let cantidad_filas = tabla.rows.length;
    for (let i = cantidad_filas; i > 0; i--) {
        tabla.deleteRow(i - 1);
    }
}



//Extraemos los datos de la cookie.
function extraerDatosCookie() {
    let datosCookie = document.cookie.split(";");
    let dato;
    let clave;
    let valor;
    for (let i = 0; i < datosCookie.length; i++) {
        dato = datosCookie[i].split("=");
        clave = dato[0].trim();
        valor = dato[1];
        if (clave == "id") {
            USUARIO.id = Number(valor);
        }
        if (clave == "usuario") {
            USUARIO.usuario = valor;
        }
    }
}
function mostrarDatosUsuario() {
    $("#datos__nombre_usuario").text(USUARIO.usuario);
}



//Busca los datos de los albumes según la consulta pasada como parámetro.
function cargaAlbumes(_consulta) {
    id_album = [];
    nombre_album = [];
    foto_album = [];
    artista_album = [];
    $.ajax ({
        url: "../php/cargaAlbumes.php",
        type: "POST",
        async: false,
        data: {cadena:_consulta},
        success: function(respuesta) {
            JSON.parse(respuesta, function(clave, valor) {
                if (clave == "alb_id") {
                    id_album.push(valor);
                }
                if (clave == "alb_nombre") {
                    nombre_album.push(valor);
                }
                if (clave == "alb_foto") {
                    foto_album.push(valor);
                }
                if (clave == "art_nombre") {
                    artista_album.push(valor);
                }
            });
        }
    });
};



//Mostramos en pantalla los albumes.
function muestraAlbumes() {
    //Limpiamos todas las imágenes.
    let cadena = "";
    for (let i = 0; i <= 12; i++) {
        cadena = ".tapa" + String(i);
        $(cadena).attr("src", "");
        $(cadena).attr("alt", "");
    }
    //Cargamos las imágenes en los contenedores.
    for (let i = 0; i < 12; i++) {
        cadena = ".tapa" + String(i);
        $(cadena).attr("id", id_album[indice_album]);
        $(cadena).attr("src", foto_album[indice_album]);
        $(cadena).attr("alt", artista_album[indice_album] + ", " + nombre_album[indice_album]);
        indice_album++;
    }
}


function cargaAnimaciones() {
    $(".filtro__filtro").mouseenter(function() {
        $(".filtro__canciones").addClass("filtro__canciones_nueva_posicion");
        $(".filtro__artista").addClass("filtro__artista_nueva_posicion");
        $(".filtro__album").addClass("filtro__album_nueva_posicion");
        $(".filtro__favoritos").addClass("filtro__favoritos_nueva_posicion");
        $(".filtro__sugeridos").addClass("filtro__sugeridos_nueva_posicion");
        $(".filtro__filtro").addClass("filtro__filtro_nueva_posicion");
    });
    //Acciones al salir el mouse de la barra de filtros.
    $(".filtro__contenedor").mouseleave(function() {
        $(".filtro__canciones").removeClass("filtro__canciones_nueva_posicion");
        $(".filtro__artista").removeClass("filtro__artista_nueva_posicion");
        $(".filtro__album").removeClass("filtro__album_nueva_posicion");
        $(".filtro__favoritos").removeClass("filtro__favoritos_nueva_posicion");
        $(".filtro__sugeridos").removeClass("filtro__sugeridos_nueva_posicion");
        $(".filtro__filtro").removeClass("filtro__filtro_nueva_posicion");
    });
}