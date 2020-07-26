"use strict";
//Reproductor del sitio.


//Instanciamos los objetos.
const USUARIO = new Usuario();
const ALBUM = new Album();


//Variables globales.
var bucle = false;
var id_album = [];
var nombre_album = [];
var foto_album = [];
var artista_album = [];
//Constante para el media.
var media;



//Inicializamos la aplicación.
$(document).ready(function() {
    //Relacionamos la etiqueta audio con la constante.
    media = document.getElementById("media");
    ALBUM.media = media;
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
                    "ORDER BY alb_nombre";
    //Cargamos las imágenes de las tapas de los albumes.
    cargaAlbumes(consulta);
    muestraAlbumes();
    //Cargamos las animaciones.
    cargaAnimaciones();
    //Asociamos los eventos.
     $(".tapa").click(function() {
         cargarAlbumSeleccionado($(this).attr("id"));
         limpiarListaCanciones()
         mostrarListaCanciones();
         ALBUM.cargarFuenteMedio();
         $("#btnPlay_img").attr("src", "../imagenes/Botones/Play.png");
         $("#btnPlay_img").attr("alt", "Botón de play");
  });
     $("#btnPlay").click(function() {
         if (!media.paused && !media.ended) {
            ALBUM.pausar();
            $("#btnPlay_img").attr("src", "../imagenes/Botones/Play.png");
            $("#btnPlay_img").attr("alt", "Botón de play");
        }else{
            if (ALBUM.reproducir()) {
                $("#btnPlay_img").attr("src", "../imagenes/Botones/Pausa.png");
                $("#btnPlay_img").attr("alt", "Botón de pausa");
            }
        }
     });
     $("#btnParar").click(function() {
         ALBUM.detenerCancion();
         $("#btnPlay_img").attr("src", "../imagenes/Botones/Play.png");
         $("#btnPlay_img").attr("alt", "Botón de play");
  });
     $("#btnSiguienteReproductor").click(function() {
         if (media.src != "") {
             if (ALBUM.siguienteCancion()) {
                $("#btnPlay_img").attr("src", "../imagenes/Botones/Pausa.png");
                $("#btnPlay_img").attr("alt", "Botón de pausa");
             }
         }
    });
    $("#btnAnteriorReproductor").click(function() {
        if (media.src != "") {
            if (ALBUM.anteriorCancion()) {
               $("#btnPlay_img").attr("src", "../imagenes/Botones/Pausa.png");
               $("#btnPlay_img").attr("alt", "Botón de pausa");
            }
        }
    });
    $("#btnAdelantar").click(function() {
        ALBUM.adelantarCancion();
    });
    $("#btnRetroceder").click(function() {
        ALBUM.retrocederCancion();
    });
    $("#btnMute").click(function() {
        if (media.muted) {
            ALBUM.silencioSonido();
            $("#btnMute_img").attr("src", "../imagenes/Botones/Mute.png");
        }else{
            ALBUM.silencioSonido();
            $("#btnMute_img").attr("src", "../imagenes/Botones/Sonido.png");
        }
    });
    //Evento al terminar la reproducción de la canción.
    media.addEventListener("ended", function() {
        if (!ALBUM.siguienteCancion()) {
            $("#btnPlay_img").attr("src", "../imagenes/Botones/Play.png");
            $("#btnPlay_img").attr("alt", "Botón de play");
        }        
        
    })
    //Control del deslizador del volumen.
    $("#desVolumen").mousedown(function() {
        bucle = true;
    });
    $("#desVolumen").mousemove(function() {
        if (bucle) {
            
        }
    });
    //Soltar el deslizador del volumen.
    $("#desVolumen").mouseup(function() {
        alert();
    });
})



//Mostramos las canciones en la tabla de HTML.
function  mostrarListaCanciones() {
    let tamanio = ALBUM.canciones[0].length;
    let tabla = document.getElementById("tabla_canciones");
    let texto;
    let imagen;
    for (let i = 0; i < tamanio; i++) {
        let fila = document.createElement("tr");
        for (let j = 1; j <= 2; j++) {
            let celda = document.createElement("td");
            if (j == 1) {
                imagen = document.createElement("img");
                imagen.setAttribute("class", "estrella_lista");
                imagen.src = "../imagenes/Estrella_negra.png";
                imagen.alt = "Estrella de favorito para " + ALBUM.canciones[1][i];
                texto = imagen;
            }else{
                if (j == 2) {
                    texto = document.createTextNode(ALBUM.canciones[1][i]);
                }
            }
            celda.appendChild(texto);
            fila.appendChild(celda);
            tabla.appendChild(fila);

        }
    }
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
    consulta = "SELECT can_id, can_nombre, can_url FROM canciones " +
               "INNER JOIN canciones_albumes " +
               "ON canciones.can_id = canciones_albumes.cal_idcancion " +
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
            })
            let matriz = [];
            ALBUM.canciones = [];
            matriz.push(id, nombre, url);
            ALBUM.canciones = matriz;
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
    //Variable para el indice del array de albumes.
    let indice = 0;
    for (let i = 0; i < 12; i++) {
        cadena = ".tapa" + String(i);
        $(cadena).attr("id", id_album[indice]);
        $(cadena).attr("src", foto_album[indice]);
        $(cadena).attr("alt", artista_album[indice] + ", " + nombre_album[indice]);
        indice++;
    }
}


function cargaAnimaciones() {
    $(".filtro__filtro").mouseenter(function() {
        $(".filtro__canciones").addClass("nueva_posicion_filtro");
        $(".filtro__artista").addClass("nueva_posicion");
        $(".filtro__album").addClass("nueva_posicion");
        $(".filtro__favoritos").addClass("nueva_posicion");
        $(".filtro__sugeridos").addClass("nueva_posicion");
        $(".filtro__filtro").addClass("nueva_posicion");
    });
    //Acciones al salir el mouse de la barra de filtros.
    $(".filtro").mouseleave(function() {
        $(".filtro__canciones").removeClass("nueva_posicion_filtro");
        $(".filtro__artista").removeClass("nueva_posicion");
        $(".filtro__album").removeClass("nueva_posicion");
        $(".filtro__favoritos").removeClass("nueva_posicion");
        $(".filtro__sugeridos").removeClass("nueva_posicion");
        $(".filtro__filtro").removeClass("nueva_posicion");
    });
}