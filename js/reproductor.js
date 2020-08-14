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
var cero_grados = true;
var texto_filtro = "";
var texto_filtro_NoAfectaLista = "";
//Constante para el media.
var media;
//Variables para los temporizadores.
var tiempo_fadeout = 500;
var tiempo_fadein = 500;
//Variable para saber si salimos del filtro.
var filtro_activo = false;



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
    let consulta = "SELECT alb_id, alb_nombre, alb_foto, art_nombre FROM albumes " +
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
    $(".imagenes > div").css("opacity", "1");
    //si hay más de 12 albumes para mostrar, hacemos visible el botón de siguientes imágenes.
    if (id_album.length > 12) {
        $("#btnSiguiente").css("visibility", "visible");
    };
    //Cargamos las animaciones.
    cargaAnimaciones();
    //Asociamos los eventos de las tapas de los albumes.
    $(".tapa").click(function() {
        let id_album_seleccionado = $(this).attr("id");
        if (id_album_seleccionado != ALBUM.id && id_album_seleccionado != 0) {
            cargarAlbumSeleccionado($(this).attr("id"));
            ALBUM.indice = 0;
            //Bajamos el volumen gradualmente.
            if (!media.paused && !media.ended) {
                let volumen = media.volume;
                let temporizador_vol = setInterval(function() {
                    media.volume -= 0.01;
                    if (media.volume < 0.05) {
                        media.load();
                        media.volume = volumen;
                        ALBUM.asignarCancion();
                        clearInterval(temporizador_vol)
                    }
                }, 10)
            }else{
                ALBUM.asignarCancion();
            }
            $(".listas__mensaje").fadeOut(300, function() {
                limpiarListaCanciones()
                mostrarListaCanciones();
            })
            $("#btnPlay_img").attr("src", "../imagenes/Botones/Play.png");
            $("#btnPlay_img").attr("alt", "Botón de play");
            $("#barra_tiempo").val(0);
        }
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
                if (filtro_activo) {
                    //Si el filtro está activo, mostramos los datos de la canción.
                    $(".info__imagen").attr("src", ALBUM.canciones[ALBUM.indice].artista.foto);
                    $(".info__imagen").attr("alt", "Imagén de" + ALBUM.canciones[ALBUM.indice].artista.nombre);
                    $(".info__artista").text(ALBUM.canciones[ALBUM.indice].artista.nombre);
                    $(".info__album").text(ALBUM.canciones[ALBUM.indice].nombre);
                    $(".info__anio").text("");
               }
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
                //Si hay un filtro, lo detectamos y le cambiamos el color de la canción coincidente con el filtro.
                let texto_td = $("#" + String(ALBUM.indice - 1)).text();
                texto_td = texto_td.toLowerCase();
                texto_filtro = texto_filtro.toLowerCase();
                if (texto_td.indexOf(texto_filtro) == -1 || texto_filtro == "") {
                    $("#" + String(ALBUM.indice - 1)).css("color", "rgb(220, 220, 255)");
                }else{
                    $("#" + String(ALBUM.indice - 1)).css("color", "rgb(150, 150, 255)");
                }
                $("#" + String(ALBUM.indice)).css("color", "red");
                $(".info__artista").text(ALBUM.canciones[ALBUM.indice].artista);
                if (filtro_activo) {
                    //Si el filtro está activo, mostramos los datos de la canción.
                    $(".info__imagen").attr("src", ALBUM.canciones[ALBUM.indice].artista.foto);
                    $(".info__imagen").attr("alt", "Imagén de" + ALBUM.canciones[ALBUM.indice].artista.nombre);
                    $(".info__artista").text(ALBUM.canciones[ALBUM.indice].artista.nombre);
                    $(".info__album").text(ALBUM.canciones[ALBUM.indice].nombre);
                    $(".info__anio").text("");
                }
            }
         }
    });
    $("#btnAnteriorReproductor").click(function() {
        if (media.src != "") {
            if (ALBUM.anteriorCancion()) {
                CANCION.reproducir();
               $("#btnPlay_img").attr("src", "../imagenes/Botones/Pausa.png");
               $("#btnPlay_img").attr("alt", "Botón de pausa");
                $("#" + String(ALBUM.indice)).css("color", "red");
                //Si hay un filtro, lo detectamos y le cambiamos el color de la canción coincidente con el filtro.
                let texto_td = $("#" + String(ALBUM.indice + 1)).text();
                texto_td = texto_td.toLowerCase();
                texto_filtro = texto_filtro.toLowerCase();
                if (texto_td.indexOf(texto_filtro) == -1 || texto_filtro == "") {
                    $("#" + String(ALBUM.indice + 1)).css("color", "rgb(220, 220, 255)");
                }else{
                    $("#" + String(ALBUM.indice + 1)).css("color", "rgb(150, 150, 255)");
                };
               $("#" + String(ALBUM.indice)).css("color", "red");
               $(".info__artista").text(ALBUM.canciones[ALBUM.indice].artista);
               if (filtro_activo) {
                    //Si el filtro está activo, mostramos los datos de la canción.
                    $(".info__imagen").attr("src", ALBUM.canciones[ALBUM.indice].artista.foto);
                    $(".info__imagen").attr("alt", "Imagén de" + ALBUM.canciones[ALBUM.indice].artista.nombre);
                    $(".info__artista").text(ALBUM.canciones[ALBUM.indice].artista.nombre);
                    $(".info__album").text(ALBUM.canciones[ALBUM.indice].nombre);
                    $(".info__anio").text("");
               }
    
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
                if (cero_grados) {
                    giraAlbumes_0_90();
                    giraAlbumes_90_180();
                }else{
                    giraAlbumes_180_270();
                    giraAlbumes_270_0();
                }
                if (indice_album == id_album.length) {
                    $(".filtro__btnSiguiente").css("visibility", "hidden");
                }
                $(".filtro__btnAnterior").css("visibility", "visible");
            }else{
                //Establecemos el índice para que complete los 12 albumes en pantalla.
                indice_album = id_album.length - 12;
                if (cero_grados) {
                    giraAlbumes_0_90();
                    giraAlbumes_90_180();
                }else{
                    giraAlbumes_180_270();
                    giraAlbumes_270_0();
                }
                $(".filtro__btnAnterior").css("visibility", "visible");
                $(".filtro__btnSiguiente").css("visibility", "hidden");
            }

        }
    });
    $("#btnAnterior").click(function() {
        if (indice_album >= 24) {
            indice_album -= 24;
            if (indice_album == 0) {
                $(".filtro__btnAnterior").css("visibility", "hidden");
            }
            if (cero_grados) {
                giraAlbumes_0_270();
                giraAlbumes_270_180();
            }else{
                giraAlbumes_180_90();
                giraAlbumes_90_0();
            }
            $(".filtro__btnSiguiente").css("visibility", "visible");
        }else{
            if (indice_album > 12) {
                indice_album = 0;
                if (cero_grados) {
                    giraAlbumes_0_270();
                    giraAlbumes_270_180();
                }else{
                    giraAlbumes_180_90();
                    giraAlbumes_90_0();
                }
                    $(".filtro__btnSiguiente").css("visibility", "visible");
                $(".filtro__btnAnterior").css("visibility", "hidden");
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
            $("#txtFiltro").on("keydown", function(tecla) {
                if (tecla.which == "13") {
                    texto_filtro = $("#txtFiltro").val();
                    if (texto_filtro != "") {
                        filtro_activo = true;
                        $("#btnQuitarFiltro").css("visibility", "visible");
                        let consulta = "SELECT alb_id, alb_nombre, alb_foto, art_nombre" +
                                       " FROM albumes" +
                                       " INNER JOIN canciones_albumes" +
                                       " ON albumes.alb_id = canciones_albumes.cal_idalbum" +
                                       " INNER JOIN canciones" +
                                       " ON canciones_albumes.cal_idcancion = canciones.can_id" +
                                       " INNER JOIN canciones_artistas" +
                                       " ON canciones.can_id = canciones_artistas.car_idcancion" +
                                       " INNER JOIN artistas" +
                                       " ON canciones_artistas.car_idartista = artistas.art_id" +
                                       " WHERE can_nombre LIKE \"%" + texto_filtro + "%\"" +
                                       " GROUP BY alb_id;";
                        cargaAlbumes(consulta);
                        $(".imagenes").fadeOut(tiempo_fadeout, function() {
                            muestraAlbumes();
                            $(".imagenes").fadeIn(tiempo_fadein);
                        });
                        $("#btnAnterior").css("visibility", "hidden");
                        if (id_album.length > 12) {
                            $("#btnSiguiente").css("visibility", "visible");
                        }else{
                            $("#btnSiguiente").css("visibility", "hidden");
                        }
                    };
                }
                if (tecla.which == "27") {
                    if (filtro_activo) {
                        quitarFiltro();
                    }else{
                        //Devolvemos los filtros a la pantalla
                        $(".filtro__txt").css("display", "none");
                        $("#btnFiltroCancion").removeClass("filtro_posicion_izquierda");
                        if ($("#btnFiltroArtista").hasClass("filtro__artista_nueva_posicion")) {
                            $("#btnFiltroCancion").addClass("filtro__canciones_nueva_posicion");
                        }
                        $("#btnFiltroArtista").fadeIn(tiempo_fadein);
                        $("#btnFiltroAlbum").fadeIn(tiempo_fadein);
                        $("#btnFiltroFavoritos").fadeIn(tiempo_fadein);
                        $("#btnFiltroRecomendados").fadeIn(tiempo_fadein);
                        $("#btnFiltroGeneral").fadeIn(tiempo_fadeout);
                    }
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
            $("#txtFiltro").on("keydown", function(tecla) {
                if (tecla.which == "13") {
                    let texto_filtro_NoAfectaLista = $("#txtFiltro").val();
                    if (texto_filtro_NoAfectaLista != "") {
                        filtro_activo = true;
                        $("#btnQuitarFiltro").css("visibility", "visible");
                        let consulta = "SELECT alb_id, alb_nombre, alb_foto, art_nombre " +
                                       "FROM albumes " +
                                       "INNER JOIN canciones_albumes " +
                                       "ON albumes.alb_id = canciones_albumes.cal_idalbum " +
                                       "INNER JOIN canciones " +
                                       "ON canciones_albumes.cal_idcancion = canciones.can_id " +
                                       "INNER JOIN canciones_artistas " +
                                       "ON canciones.can_id = canciones_artistas.car_idcancion " +
                                       "INNER JOIN artistas " +
                                       "ON canciones_artistas.car_idartista = artistas.art_id " +
                                       "WHERE art_nombre LIKE \"%" + texto_filtro_NoAfectaLista + "%\"" +
                                       "GROUP BY alb_id;";
                        cargaAlbumes(consulta);
                        $(".imagenes").fadeOut(tiempo_fadeout, function() {
                            muestraAlbumes();
                            $(".imagenes").fadeIn(tiempo_fadein);
                        });
                        $("#btnAnterior").css("visibility", "hidden");
                        if (id_album.length > 12) {
                            $("#btnSiguiente").css("visibility", "visible");
                        }else{
                            $("#btnSiguiente").css("visibility", "hidden");
                        }
                    };
                }
                if (tecla.which == "27") {
                    if (filtro_activo) {
                        quitarFiltro();
                    }else{
                        //Devolvemos los filtros a la pantalla
                        $(".filtro__txt").css("display", "none");
                        $("#btnFiltroArtista").removeClass("filtro_posicion_izquierda");
                        if ($("#btnFiltroAlbum").hasClass("filtro__album_nueva_posicion")) {
                            $("#btnFiltroArtista").addClass("filtro__artista_nueva_posicion");
                        }
                        $("#btnFiltroCancion").fadeIn(tiempo_fadein);
                        $("#btnFiltroAlbum").fadeIn(tiempo_fadein);
                        $("#btnFiltroFavoritos").fadeIn(tiempo_fadein);
                        $("#btnFiltroRecomendados").fadeIn(tiempo_fadein);
                        $("#btnFiltroGeneral").fadeIn(tiempo_fadein);
                    }
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
            $("#txtFiltro").on("keydown", function(tecla) {
                if (tecla.which == "13") {
                    texto_filtro_NoAfectaLista = $("#txtFiltro").val();
                    if (texto_filtro_NoAfectaLista != "") {
                        filtro_activo = true;
                        $("#btnQuitarFiltro").css("visibility", "visible");
                        let consulta = "SELECT alb_id, alb_nombre, alb_foto, art_nombre" +
                                       " FROM albumes" +
                                       " INNER JOIN canciones_albumes" +
                                       " ON albumes.alb_id = canciones_albumes.cal_idalbum" +
                                       " INNER JOIN canciones" +
                                       " ON canciones_albumes.cal_idcancion = canciones.can_id" +
                                       " INNER JOIN canciones_artistas" +
                                       " ON canciones.can_id = canciones_artistas.car_idcancion" +
                                       " INNER JOIN artistas" +
                                       " ON canciones_artistas.car_idartista = artistas.art_id" +
                                       " WHERE alb_nombre LIKE \"%" + texto_filtro_NoAfectaLista + "%\"" +
                                       " GROUP BY alb_id;";
                        cargaAlbumes(consulta);
                        $(".imagenes").fadeOut(tiempo_fadeout, function() {
                            muestraAlbumes();
                            $(".imagenes").fadeIn(tiempo_fadein);
                        });
                        $("#btnAnterior").css("visibility", "hidden");
                        if (id_album.length > 12) {
                            $("#btnSiguiente").css("visibility", "visible");
                        }else{
                            $("#btnSiguiente").css("visibility", "hidden");
                        }
                    };
                }
                if (tecla.which == "27") {
                    if (filtro_activo) {
                        quitarFiltro();
                    }else{
                        //Devolvemos los filtros a la pantalla
                        $(".filtro__txt").css("display", "none");
                        $("#btnFiltroAlbum").removeClass("filtro_posicion_izquierda");
                        if ($("#btnFiltroArtista").hasClass("filtro__artista_nueva_posicion")) {
                            $("#btnFiltroAlbum").addClass("filtro__album_nueva_posicion");
                        }
                        $("#btnFiltroCancion").fadeIn(tiempo_fadein);
                        $("#btnFiltroArtista").fadeIn(tiempo_fadein);
                        $("#btnFiltroFavoritos").fadeIn(tiempo_fadein);
                        $("#btnFiltroRecomendados").fadeIn(tiempo_fadein);
                        $("#btnFiltroGeneral").fadeIn(tiempo_fadein);
                    }
                }
            // });
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
            $("#txtFiltro").on("keydown", function(tecla) {
                if (tecla.which == "13") {
                    texto_filtro_NoAfectaLista = $("#txtFiltro").val();
                    filtro_activo = true;
                    $("#btnQuitarFiltro").css("visibility", "visible");
                    let consulta = "SELECT alb_id, alb_nombre, alb_foto, art_nombre" +
                                   " FROM albumes" +
                                   " INNER JOIN canciones_albumes" +
                                   " ON albumes.alb_id = canciones_albumes.cal_idalbum" +
                                   " INNER JOIN canciones" +
                                   " ON canciones_albumes.cal_idcancion = canciones.can_id" +
                                   " INNER JOIN canciones_artistas" +
                                   " ON canciones.can_id = canciones_artistas.car_idcancion" +
                                   " INNER JOIN artistas" +
                                   " ON canciones_artistas.car_idartista = artistas.art_id" +
                                   " INNER JOIN favoritas" +
                                   " ON canciones.can_id = favoritas.fav_idcancion" +
                                   " WHERE fav_idusuario = " + String(USUARIO.id);
                    if (texto_filtro_NoAfectaLista != "") {
                        consulta = consulta + " AND alb_nombre LIKE \"%" + texto_filtro_NoAfectaLista + "%\" " +
                                              " OR can_nombre LIKE \"%" + texto_filtro_NoAfectaLista + "%\" " +
                                              " OR art_nombre LIKE \"%" + texto_filtro_NoAfectaLista + "%\" ";
                    }
                    consulta = consulta +  " GROUP BY alb_id;";
                    cargaAlbumes(consulta);
                    $(".imagenes").fadeOut(tiempo_fadeout, function() {
                        muestraAlbumes();
                        $(".imagenes").fadeIn(tiempo_fadein);
                    });
                    $("#btnAnterior").css("visibility", "hidden");
                    if (id_album.length > 12) {
                        $("#btnSiguiente").css("visibility", "visible");
                    }else{
                        $("#btnSiguiente").css("visibility", "hidden");
                    }
                }
                if (tecla.which == "27") {
                    if (filtro_activo) {
                        quitarFiltro();
                    }else{
                        //Devolvemos los filtros a la pantalla
                        $(".filtro__txt").css("display", "none");
                        $("#btnFiltroFavoritos").removeClass("filtro_posicion_izquierda");
                        if ($("#btnFiltroAlbum").hasClass("filtro__album_nueva_posicion")) {
                            $("#btnFiltroFavoritos").addClass("filtro__favoritos_nueva_posicion");
                        }
                        $("#btnFiltroCancion").fadeIn(tiempo_fadein);
                        $("#btnFiltroArtista").fadeIn(tiempo_fadein);
                        $("#btnFiltroAlbum").fadeIn(tiempo_fadein);
                        $("#btnFiltroRecomendados").fadeIn(tiempo_fadein);
                        $("#btnFiltroGeneral").fadeIn(tiempo_fadein);
                    }
                }
            });
        }, 1000);
        setTimeout(function() {
            $("#btnFiltroFavoritos").removeClass("filtro__favoritos_nueva_posicion");
            $("#btnFiltroFavoritos").addClass("filtro_posicion_izquierda");
        }, 500)
    });
    $("#btnFiltroRecomendados").click(function() {
        filtro_activo = true;
        buscarRecomendados();
        //Quitamos los demás filtros de la pantalla.
        $("#btnFiltroCancion").fadeOut(tiempo_fadeout);
        $("#btnFiltroArtista").fadeOut(tiempo_fadeout);
        $("#btnFiltroAlbum").fadeOut(tiempo_fadeout);
        $("#btnFiltroFavoritos").fadeOut(tiempo_fadeout);
        $("#btnFiltroGeneral").fadeOut(tiempo_fadeout);
        setTimeout(function() {
            $("#btnFiltroRecomendados").removeClass("filtro__sugeridos_nueva_posicion");
            $("#btnFiltroRecomendados").addClass("filtro_posicion_izquierda");
            $("#btnQuitarFiltro").css("visibility", "visible");
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
            $("#txtFiltro").on("keydown", function(tecla) {
                if (tecla.which == "13") {
                    texto_filtro = $("#txtFiltro").val();
                    if (texto_filtro != "") {
                        filtro_activo = true;
                        $("#btnQuitarFiltro").css("visibility", "visible");
                        let consulta = "SELECT alb_id, alb_nombre, alb_foto, art_nombre" +
                                       " FROM albumes" +
                                       " INNER JOIN canciones_albumes" +
                                       " ON albumes.alb_id = canciones_albumes.cal_idalbum" +
                                       " INNER JOIN canciones" +
                                       " ON canciones_albumes.cal_idcancion = canciones.can_id" +
                                       " INNER JOIN canciones_artistas" +
                                       " ON canciones.can_id = canciones_artistas.car_idcancion" +
                                       " INNER JOIN artistas" +
                                       " ON canciones_artistas.car_idartista = artistas.art_id" +
                                       " WHERE alb_nombre LIKE \"%" + texto_filtro + "%\"" +
                                       " OR can_nombre LIKE \"%" + texto_filtro + "%\"" +
                                       " OR art_nombre LIKE \"%" + texto_filtro + "%\"" +
                                       " GROUP BY alb_id;";
                        cargaAlbumes(consulta);
                        $(".imagenes").fadeOut(tiempo_fadeout, function() {
                            muestraAlbumes();
                            $(".imagenes").fadeIn(tiempo_fadein);
                        });
                        $("#btnAnterior").css("visibility", "hidden");
                        if (id_album.length > 12) {
                            $("#btnSiguiente").css("visibility", "visible");
                        }else{
                            $("#btnSiguiente").css("visibility", "hidden");
                        }
                    };
                }
                if (tecla.which == "27") {
                    if (filtro_activo) {
                        quitarFiltro();
                    }else{
                        //Devolvemos los filtros a la pantalla
                        $(".filtro__txt").css("display", "none");
                        $("#btnFiltroGeneral").removeClass("filtro_posicion_izquierda");
                        if ($("#btnFiltroAlbum").hasClass("filtro__album_nueva_posicion")) {
                            $("#btnFiltroGeneral").addClass("filtro__filtro_nueva_posicion");
                        }
                        $("#btnFiltroCancion").fadeIn(tiempo_fadein);
                        $("#btnFiltroArtista").fadeIn(tiempo_fadein);
                        $("#btnFiltroAlbum").fadeIn(tiempo_fadein);
                        $("#btnFiltroFavoritos").fadeIn(tiempo_fadein);
                        $("#btnFiltroRecomendados").fadeIn(tiempo_fadein);
                    }
                }
            });
        }, 1000);
        setTimeout(function() {
            $("#btnFiltroGeneral").removeClass("filtro__filtro_nueva_posicion");
            $("#btnFiltroGeneral").addClass("filtro_posicion_izquierda");
        }, 500)
    });
    //Acciones al hacer click en el botón de cerrar filtro.
    $("#btnQuitarFiltro").click(function() {
        quitarFiltro();
    })
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
            //Si hay un filtro, lo detectamos y le cambiamos el color de la canción coincidente con el filtro.
            let texto_td = $("#" + String(ALBUM.indice - 1)).text();
            texto_td = texto_td.toLowerCase();
            texto_filtro = texto_filtro.toLowerCase();
            if (texto_td.indexOf(texto_filtro) == -1 || texto_filtro == "") {
                $("#" + String(ALBUM.indice - 1)).css("color", "rgb(220, 220, 255)");
            }else{
                $("#" + String(ALBUM.indice - 1)).css("color", "rgb(150, 150, 255)");
            };
            $("#" + String(ALBUM.indice)).css("color", "red");
            if (filtro_activo) {
                //Si el filtro está activo, mostramos los datos de la canción.
                $(".info__imagen").attr("src", ALBUM.canciones[ALBUM.indice].artista.foto);
                $(".info__imagen").attr("alt", "Imagén de" + ALBUM.canciones[ALBUM.indice].artista.nombre);
                $(".info__artista").text(ALBUM.canciones[ALBUM.indice].artista.nombre);
                $(".info__album").text(ALBUM.canciones[ALBUM.indice].nombre);
                $(".info__anio").text("");
            }
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



function quitarFiltro() {
    filtro_activo = false;
    ALBUM.id = 0;
    //Recargamos las tapas de los albumes.
    let consulta = "SELECT alb_id, alb_nombre, alb_foto, art_nombre FROM albumes" +
                   " INNER JOIN canciones_albumes" +
                   " ON albumes.alb_id = canciones_albumes.cal_idalbum" +
                   " INNER JOIN canciones_artistas" +
                   " ON canciones_albumes.cal_idcancion = canciones_artistas.car_idcancion" +
                   " INNER JOIN artistas" +
                   " ON canciones_artistas.car_idartista = artistas.art_id" +
                   " GROUP BY alb_id" +
                   " ORDER BY alb_nombre" + ";";
    //Cargamos las imágenes de las tapas de los albumes.
    cargaAlbumes(consulta);
    $(".imagenes").fadeOut(tiempo_fadeout, function() {
        muestraAlbumes();
        $(".imagenes").fadeIn(tiempo_fadein);
    })
    //si hay más de 12 albumes para mostrar, hacemos visible el botón de siguientes imágenes.
    if (id_album.length > 12) {
        $("#btnSiguiente").css("visibility", "visible");
    }
    //Quitamos la asociación de eventos.
    $("#txtFiltro").off();
    $(".tapa").off();
    //Limpiamos las variables de los filtros.
    texto_filtro = "";
    texto_filtro_NoAfectaLista = "";
    $("#txtFiltro").val("");
    //Quitamos lo relacionado al filtro.
    $(".filtro__txt").css("display", "none");
    $("#btnQuitarFiltro").css("visibility", "hidden");
    $("#btnAnterior").css("visibility", "hidden");
    //Eliminamos la clase de margen izquierdo.        
    $("#btnFiltroCancion").removeClass("filtro_posicion_izquierda");
    $("#btnFiltroArtista").removeClass("filtro_posicion_izquierda");
    $("#btnFiltroAlbum").removeClass("filtro_posicion_izquierda");
    $("#btnFiltroFavoritos").removeClass("filtro_posicion_izquierda");
    $("#btnFiltroRecomendados").removeClass("filtro_posicion_izquierda");
    $("#btnFiltroGeneral").removeClass("filtro_posicion_izquierda");
    //Eliminamos la clase nueva posición.
    $(".filtro__canciones").removeClass("filtro__canciones_nueva_posicion");
    $(".filtro__artista").removeClass("filtro__artista_nueva_posicion");
    $(".filtro__album").removeClass("filtro__album_nueva_posicion");
    $(".filtro__favoritos").removeClass("filtro__favoritos_nueva_posicion");
    $(".filtro__sugeridos").removeClass("filtro__sugeridos_nueva_posicion");
    $(".filtro__filtro").removeClass("filtro__filtro_nueva_posicion");
    //Hacemos visibles los filtros.
    $("#btnFiltroCancion").fadeIn(tiempo_fadein);
    $("#btnFiltroArtista").fadeIn(tiempo_fadein);
    $("#btnFiltroAlbum").fadeIn(tiempo_fadein);
    $("#btnFiltroFavoritos").fadeIn(tiempo_fadein);
    $("#btnFiltroRecomendados").fadeIn(tiempo_fadein);
    $("#btnFiltroGeneral").fadeIn(tiempo_fadein);
    //Asociamos los eventos de las tapas de los albumes.
     $(".tapa").on("click", function() {
        let id_album_seleccionado = $(this).attr("id");
        if (id_album_seleccionado != ALBUM.id && id_album_seleccionado != 0) {
            cargarAlbumSeleccionado($(this).attr("id"));
            ALBUM.indice = 0;
            //Bajamos el volumen gradualmente.
            if (!media.paused && !media.ended) {
                let volumen = media.volume;
                let temporizador_vol = setInterval(function() {
                    media.volume -= 0.01;
                    if (media.volume < 0.05) {
                        media.load();
                        media.volume = volumen;
                        ALBUM.asignarCancion();
                        clearInterval(temporizador_vol)
                    }
                }, 10)
            }else{
                ALBUM.asignarCancion();
            }
            $(".listas__mensaje").fadeOut(300, function() {
                limpiarListaCanciones()
                mostrarListaCanciones();
            })
            $("#btnPlay_img").attr("src", "../imagenes/Botones/Play.png");
            $("#btnPlay_img").attr("alt", "Botón de play");
            $("#barra_tiempo").val(0);
        }
   })
}



function buscarRecomendados() {
    //Buscamos los géneros de los favoritos del usuario.
    let id_generos = [];
    let nombre_genero = [];
    let imagen_genero = [];
    let consulta = "SELECT gen_id, gen_nombre, gen_imagen" +
                   " FROM generos" +
                   " INNER JOIN canciones" +
                   " ON generos.gen_id = canciones.can_idgenero" +
                   " INNER JOIN favoritas" +
                   " ON canciones.can_id = favoritas.fav_idcancion" +
                   " WHERE fav_idusuario = " + String(USUARIO.id) +
                   " GROUP BY gen_id";
    $.ajax({
        url: "../php/cargaDatos.php",
        type: "POST",
        async: false,
        data: {cadena:consulta},
        success: function(respuesta) {
            if (respuesta != "fallo") {
                JSON.parse(respuesta, function(clave, valor) {
                    if (clave == "gen_id") {
                        id_generos.push(valor);
                    }
                    if (clave == "gen_imagen") {
                        imagen_genero.push(valor);
                    }
                    if (clave == "gen_nombre") {
                        nombre_genero.push(valor);
                    }
                })
            }else{
                //Mensaje de fallo de datos.
            }
        }
    })
    //Mostramos las tapas de los favoritos de los generos preferidos del usuario.
    $(".imagenes").fadeOut(tiempo_fadeout, function() {
        mostrarTapasGeneros(id_generos, imagen_genero, nombre_genero);
        $(".imagenes").fadeIn(tiempo_fadein);
    });
    //Quitamos los botones de siguiente y anteriorimagenes.
    $("#btnAnterior").css("visibility", "hidden");
    $("#btnSiguiente").css("visibility", "hidden");
    ALBUM.id = 0;
    //Desasociamos los eventos click de las imágenes.
    $(".tapa").off();
    //Nuevos eventosd click de las tapas del los albumes.
     $(".tapa").on("click", function() {
         let id_genero_seleccionado = $(this).attr("id");
         if (id_genero_seleccionado != ALBUM.id && id_genero_seleccionado != 0) {
             ALBUM.id = id_genero_seleccionado;
             cargarAlbumSugerido(id_genero_seleccionado);
         }
    });
}



function cargarAlbumSugerido(_id_genero_seleccionado) {
    let consulta = "SELECT count(*) AS cantidad, can_id, can_nombre, can_url, art_nombre, art_foto" +
                   " FROM favoritas" +
                   " INNER JOIN canciones" +
                   " ON favoritas.fav_idcancion = canciones.can_id" +
                   " INNER JOIN canciones_artistas" +
                   " ON canciones.can_id = canciones_artistas.car_idcancion" +
                   " INNER JOIN artistas" +
                   " ON canciones_artistas.car_idartista = artistas.art_id" +
                   " WHERE can_idgenero = " + String(_id_genero_seleccionado) +
                   " GROUP BY can_id" +
                   " ORDER BY cantidad DESC" +
                   " LIMIT 10;";
    //Cargamos la lista de canciones.
    //Arrays para los datos obtenidos.
    let id = [];
    let nombre = [];
    let url = [];
    let artista = [];
    let foto_artista = [];
    $.ajax({
        url: "../php/cargaDatos.php",
        type: "POST",
        async: false,
        data: {cadena:consulta},
        success: function(respuesta) {
            if (respuesta != "fallo") {
                JSON.parse(respuesta, function(clave, valor) {
                    if (clave == "can_id") {
                        id.push(valor);
                    }
                    if (clave == "can_nombre") {
                        nombre.push(valor.slice(3));
                    }
                    if (clave == "can_url") {
                        url.push(valor);
                    }
                    if (clave == "art_nombre") {
                        artista.push(valor);
                    }
                    if (clave == "art_foto") {
                        foto_artista.push(valor);
                    }
                })
                //Eliminamos de memoria todos los objetos cancion anteriores y vaciamos el array.
                for (let i = 0; i < ALBUM.canciones.length; i++) {
                    delete ALBUM.canciones[i];
                }
                ALBUM.canciones = [];
                //Instanciamos los objetos cancion y los asignamos a la propiedad canciones del objeto album.
                for (let i = 0; i < nombre.length; i++) {
                    const ARTISTA = new Artista();
                    ARTISTA.nombre = artista[i];
                    ARTISTA.foto = foto_artista[i];
                    const CANCION = new Cancion();
                    CANCION.id = id[i];
                    CANCION.nombre = nombre[i];
                    CANCION.url = url[i];
                    CANCION.artista = ARTISTA;
                    ALBUM.canciones.push(CANCION);
                }
                //Hacemos fade out al volumen y mostramos la lista de canciones.
                $(".listas__mensaje").fadeOut(300, function() {
                    limpiarListaCanciones()
                    mostrarListaCanciones();
                })
                ALBUM.indice = 0;
                let volumen = media.volume;
                if (!media.paused && !media.ended) {
                    let temporizador_volumen = setInterval(function() {
                        media.volume -= 0.1;
                        if (media.volume < 0.05) {
                            media.load();
                            media.volume = volumen;
                            ALBUM.asignarCancion();
                            clearInterval(temporizador_volumen);
                        }
                    }, 50)
    
                }else{
                    ALBUM.asignarCancion();
                }
                $("#btnPlay_img").attr("src", "../imagenes/Botones/Play.png");
                $("#btnPlay_img").attr("alt", "Botón de play");
                $("#barra_tiempo").val(0);
            }else{
                //Mensaje de fallo de datos.
            }
        }
    })
}



function mostrarTapasGeneros(_id_generos, _imagen_genero, _nombre_genero) {
    indice_album = 0;
    let cadena = "";
    //Limpiamos las imágenes de las tapas.
    for (let i = 0; i < 12; i++) {
        cadena = ".tapa" + String(i);
        $(cadena).attr("id", "0");
        $(cadena).attr("src", "");
        $(cadena).attr("alt", "");
    }
    //Cargamos las imágenes en los contenedores.
    let cantidad_elementos = _id_generos.length;
    for (let i = 0; i < 12; i++) {
        cadena = ".tapa" + String(i);
        if (i < cantidad_elementos) {
            $(cadena).css("visibility", "visible");
            $(cadena).attr("id",_id_generos[i]);
            $(cadena).attr("src", _imagen_genero[i]);
            $(cadena).attr("alt", "Imágen de favoritos de" + _nombre_genero[i]);
        }else{
            $(cadena).css("visibility", "hidden");
        }
        indice_album++;
    }
}



//Giramos las tapas.
function giraAlbumes_0_90() {
    let i = 0;
    let temporizador =  setInterval(function() {
        $("#contenedor_tapa" + String(i)).css("transform", "rotateY(90deg)");
        //Limpiamos la imágen.
        $(".tapa" + String(i)).attr("src", "");
        $(".tapa" + String(i)).attr("alt", "");
        //Cambiamos la imágen.
        $(".tapa" + String(i)).attr("id", id_album[indice_album]);
        $(".tapa" + String(i)).attr("src", foto_album[indice_album]);
        $(".tapa" + String(i)).attr("alt", artista_album[indice_album] + ", " + nombre_album[indice_album]);
        $(".tapa" + String(i)).css("transform", "rotateY(180deg)");
        indice_album++;
        i++;
        if (i == 12) {
            clearInterval(temporizador);
        }
    }, 100);
}

function giraAlbumes_90_180() {
    let i = 0;
    let temporizador =  setInterval(function() {
        $("#contenedor_tapa" + String(i)).css("transform", "rotateY(180deg)");
        i++;
        if (i == 12) {
            clearInterval(temporizador);
        }
    }, 100);
    cero_grados = false;
}

function giraAlbumes_180_270() {
    let i = 0;
    let temporizador =  setInterval(function() {
        $("#contenedor_tapa" + String(i)).css("transform", "rotateY(270deg)");
        //Limpiamos la imágen.
        $(".tapa" + String(i)).attr("src", "");
        $(".tapa" + String(i)).attr("alt", "");
        //Cambiamos la imágen.
        $(".tapa" + String(i)).attr("id", id_album[indice_album]);
        $(".tapa" + String(i)).attr("src", foto_album[indice_album]);
        $(".tapa" + String(i)).attr("alt", artista_album[indice_album] + ", " + nombre_album[indice_album]);
        $(".tapa" + String(i)).css("transform", "rotateY(0deg)");
        indice_album++;
        i++;
        if (i == 12) {
            clearInterval(temporizador);
        }
    }, 100);
}

function giraAlbumes_270_0() {
    let i = 0;
    let temporizador =  setInterval(function() {
        $("#contenedor_tapa" + String(i)).css("transform", "rotateY(0deg)");
        i++;
        if (i == 12) {
            clearInterval(temporizador);
        }
    }, 100);
    cero_grados = true;
}

//Giramos las tapas en sentido contrario.
function giraAlbumes_0_270() {
    let i = 0;
    let temporizador =  setInterval(function() {
        $("#contenedor_tapa" + String(i)).css("transform", "rotateY(-90deg)");
        //Limpiamos la imágen.
        $(".tapa" + String(i)).attr("src", "");
        $(".tapa" + String(i)).attr("alt", "");
        //Cambiamos la imágen.
        $(".tapa" + String(i)).attr("id", id_album[indice_album]);
        $(".tapa" + String(i)).attr("src", foto_album[indice_album]);
        $(".tapa" + String(i)).attr("alt", artista_album[indice_album] + ", " + nombre_album[indice_album]);
        $(".tapa" + String(i)).css("transform", "rotateY(180deg)");
        indice_album++;
        i++;
        if (i == 12) {
            clearInterval(temporizador);
        }
    }, 100);
}

function giraAlbumes_270_180() {
    let i = 0;
    let temporizador =  setInterval(function() {
        $("#contenedor_tapa" + String(i)).css("transform", "rotateY(-180deg)");
        i++;
        if (i == 12) {
            clearInterval(temporizador);
        }
    }, 100);
    cero_grados = false;
}

function giraAlbumes_180_90() {
    let i = 0;
    let temporizador =  setInterval(function() {
        $("#contenedor_tapa" + String(i)).css("transform", "rotateY(-270deg)");
        //Limpiamos la imágen.
        $(".tapa" + String(i)).attr("src", "");
        $(".tapa" + String(i)).attr("alt", "");
        //Cambiamos la imágen.
        $(".tapa" + String(i)).attr("id", id_album[indice_album]);
        $(".tapa" + String(i)).attr("src", foto_album[indice_album]);
        $(".tapa" + String(i)).attr("alt", artista_album[indice_album] + ", " + nombre_album[indice_album]);
        $(".tapa" + String(i)).css("transform", "rotateY(0deg)");
        indice_album++;
        i++;
        if (i == 12) {
            clearInterval(temporizador);
        }
    }, 100);
}

function giraAlbumes_90_0() {
    let i = 0;
    let temporizador =  setInterval(function() {
        $("#contenedor_tapa" + String(i)).css("transform", "rotateY(0deg)");
        i++;
        if (i == 12) {
            clearInterval(temporizador);
        }
    }, 100);
    cero_grados = true;
}



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
                celda.setAttribute("style", "opacity: 0;");
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
       if (filtro_activo) {
            //Si el filtro está activo, mostramos los datos de la canción.
            $(".info__imagen").attr("src", ALBUM.canciones[ALBUM.indice].artista.foto);
            $(".info__imagen").attr("alt", "Imagén de" + ALBUM.canciones[ALBUM.indice].artista.nombre);
            $(".info__artista").text(ALBUM.canciones[ALBUM.indice].artista.nombre);
            $(".info__album").text(ALBUM.canciones[ALBUM.indice].nombre);
            $(".info__anio").text("");
       }
    });
    //Temporizadores para mostrar la lista de canciones.
    let i = 0;
    let temporizador =  setInterval(function() {
        if (i == tamanio) {
            clearInterval(temporizador);
        }else{
            //Si hay un filtro, lo detectamos y le cambiamos el color de la canción coincidente con el filtro.
            let texto_td = $("#" + String(i)).text();
            texto_td = texto_td.toLowerCase();
            texto_filtro = texto_filtro.toLowerCase();
            if (texto_td.indexOf(texto_filtro) == -1 || texto_filtro == "") {
                $("#" + String(i)).css("color", "rgb(220, 220, 255)");
            }else{
                $("#" + String(i)).css("color", "rgb(150, 150, 255)");
            };
            i++;
        }
    }, 30);
    //Mostramos las estrellas con un ligero delay respecto de las canciones por efecto estético.
    let i_estrella = 0;
    let temporizador_estrella =  setInterval(function() {
        if (i_estrella == tamanio) {
            clearInterval(temporizador_estrella);
        }else{
            $("#estrella" + String(i_estrella)).css("opacity", "1");
            i_estrella++;
        }
    }, 33);
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
    indice_album = 0;
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
            if (respuesta != "fallo") {
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
            }else{
                //Mensaje de fallo de datos.
            }
        }
    });
};



//Mostramos en pantalla los albumes.
function muestraAlbumes() {
    //Limpiamos las imágenes de las tapas.
    let cadena = "";
    for (let i = 0; i < 12; i++) {
        cadena = ".tapa" + String(i);
        $(cadena).attr("id", "0");
        $(cadena).attr("src", "");
        $(cadena).attr("alt", "");
    }
    //Cargamos las imágenes en los contenedores.
    let cantidad_tapas = id_album.length;
    for (let i = 0; i < 12; i++) {
        cadena = ".tapa" + String(i);
        if (i < cantidad_tapas) {
            $(cadena).css("visibility", "visible");
            $(cadena).attr("id", id_album[indice_album]);
            $(cadena).attr("src", foto_album[indice_album]);
            $(cadena).attr("alt", artista_album[indice_album] + ", " + nombre_album[indice_album]);
        }else{
            $(cadena).css("visibility", "hidden");
        }
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
