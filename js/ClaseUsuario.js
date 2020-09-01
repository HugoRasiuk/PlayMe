"use strict";
//Módulo para la clase del usuario.

class Usuario {
    constructor() {
        this._id = 0;
        this._usuario = "";
        this._contrasenia = "";
        this._foto = "";
    }
    //Get y Set.
    get usuario() {
        return this._usuario;
    }
    set id(param) {
        this._id = param;
    }

    get id() {
        return this._id;
    }
    set usuario(param) {
        this._usuario = param;
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
}


