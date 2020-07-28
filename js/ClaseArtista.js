//Clase del artista.

class Artista {
    constructor() {
        this._nombre = "";
        this._foto = "";
    }

    //Get y set.
    get nombre() {
        return this._nombre;
    }
    set nombre(valor) {
        this._nombre = valor;
    }

    get foto() {
        return this._foto;
    }
    set foto(valor) {
        this._foto = valor;
    }
}