"use strict";
//Módulo para la clase del usuario.

class Usuario {
    constructor() {
        this._id = 0;
        this._usuario = "";
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
}


