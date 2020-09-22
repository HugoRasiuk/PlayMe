"use strict";
//Módulo para la clase del usuario.

class Usuario {
    constructor() {
        this._id = 0;
        this._usuario = "";
        this._contrasenia = "";
        this._foto = "";
        this._foto_cambio = false;
    }
    //Get y Set.
    get usuario() {
        return this._usuario;
    }
    set usuario(param) {
        this._usuario = param;
    }

    get id() {
        return this._id;
    }
    set id(param) {
        this._id = param;
    }

    get contrasenia() {
        return this._contrasenia;
    }
    set contrasenia(param) {
        this._contrasenia = param;
    }

    get foto() {
        return this._foto;
    }
    set foto(param) {
        this._foto = param;
    }

    get foto_cambio() {
        return this._foto_cambio;
    }
    set foto_cambio(param) {
        this._foto_cambio = param;
    }


    guardarFoto(parFoto) {
        $.ajax({
            url: "../php/guardaFoto.php",
            type: "POST",
            data: parFoto,
            contentType: false,
            processData: false,
            async: false,
            success: function(respuesta) {
                if (respuesta == "ok") {
                    USUARIO.foto_cambio = true;
                }else{
                    USUARIO.foto_cambio = false;
                }
            }
        })
    }
}




