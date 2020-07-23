//Módulo para la clase del album.
class Album {
    constructor() {
        this._id = 0;
        this._nombre = "";
        this._foto = "";
        this._anio_lanzamiento = "";
        this._artista = "";
        this._foto_artista = "";
        this._canciones = [];
    }
    //Get y Set.
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

    get foto() {
        return this._foto;
    }
    set foto(valor) {
        this._foto = valor;
    }

    get anio_lanzamiento() {
        return this._anio_lanzamiento;
    }
    set anio_lanzamiento(valor) {
        this._anio_lanzamiento = valor;
    }

    get artista() {
        return this._artista;
    }
    set artista(valor) {
        this._artista = valor;
    }

    get foto_artista() {
        return this._foto_artista;
    }
    set foto_artista(valor) {
        this._foto_artista = valor;
    }

    get canciones() {
        return this._canciones;
    }
    set canciones(valor) {
        this._canciones = valor;
    }
}
