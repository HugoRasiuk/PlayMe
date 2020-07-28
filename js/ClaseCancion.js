//Clase de la cancion.

class Cancion {
    constructor() {
        this._id = 0;
        this._nombre = "";
        this._url = "";
        this._idgenero = 0;
        this._artista = "";
    }

    //Getter y setter
    get id() {
        return this._id;
    }
    set id(valor) {
        this._id = valor;
    }

    get nombre() {
        return this._nombre;
    }
    set nombre(valor) {
        this._nombre = valor;
    }

    get url() {
        return this._url;
    }
    set url(valor) {
        this._url = valor;
    }

    get idgenero() {
        return this._idgenero;
    }
    set idgenero(valor) {
        this._idgenero = valor;
    }

    get artista() {
        return this._artista;
    }
    set artista(valor) {
        this._artista = valor;
    }
}  
