"use strict";
//Reproductor del sitio.


//Instanciamos los objetos.
const USUARIO = new Usuario();
const ALBUM = new Album();


//Variables globales.
//Arrays del artista.
// var id_artista = [];
// var nombre_artista = [];
// var foto_artista = [];
//Arrays de los albumes.
var id_album = [];
var nombre_album = [];
var foto_album = [];
var artista_album = [];




//Inicializamos la aplicación.
$(document).ready(function() {
    //obtenemos los datos de la cookie y los mostramos.
    extraerDatosCookie();
    mostrarDatosUsuario();
    //cadena para la consulta de los datos.
    let consulta =  "SELECT alb_id, alb_nombre, alb_foto, art_nombre FROM albumes " +
                    "INNER JOIN artistas " +
                    "ON albumes.alb_idartista = artistas.art_id " +
                    "ORDER BY albumes.alb_nombre";
    //Cargamos las imágenes de las tapas de los albumes.
    cargaAlbumes(consulta);
    muestraAlbumes();
    //Cargamos las animaciones.
    cargaAnimaciones();
    //Asociamos los eventos.
    $(".tapa").click(function() {
        cargaAlbumSeleccionado($(this).attr("id"));
    });
})



function cargaAlbumSeleccionado(_id) {
    ALBUM.id = _id;
    //Obtenemos los datos.
    let consulta = "SELECT alb_nombre, alb_foto, alb_aniolanzamiento, art_nombre, art_foto " +
                   "FROM albumes INNER JOIN artistas " +
                   "ON albumes.alb_idartista = artistas.art_id " +
                   "WHERE alb_id = " + String(_id);
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
                if (clave == "art_foto") {
                    ALBUM.foto_artista = valor;
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
    $.ajax({
        url: "../php/cargaCanciones.php",
        type: "POST",
        async: false,
        data: {id:ALBUM.id},
        success: function(respuesta) {
            json.parse(respuesta, function(clave, valor) {

            })
        }
    })
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



//Cargamos los artistas.
// function cargaArtistas() {
//     id_artista = [];
//     nombre_artista = [];
//     foto_artista = [];
//     $.ajax ({
//         url: "../php/cargaArtistas.php",
//         type: "POST",
//         async: false,
//         success: function(respuesta) {
//             JSON.parse(respuesta, function(clave, valor) {
//                 if (clave == "art_id") {
//                     id_artista.push(valor);
//                 }
//                 if (clave == "art_nombre") {
//                     nombre_artista.push(valor);
//                 }
//                 if (clave == "art_foto") {
//                     foto_artista.push(valor);
//                 }
//             });
//         }
//     });
//     //Limpiamos todas las imágenes.
//     let cadena = "";
//     for (let i = 0; i <= 12; i++) {
//         cadena = ".tapa" + String(i);
//         $(cadena).attr("src", "");
//     }
//     //Variable para el indice de los contenedores de las tapas.
//     let indice = 0;
//     for (let i = 0; i < foto_artista.length; i++) {
//         cadena = ".tapa" + String(indice);
//         $(cadena).attr("src", foto_artista[i]);
//         indice++;
//     }
// };



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