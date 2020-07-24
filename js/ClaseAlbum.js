//Módulo para la clase del album.
class Album {
    constructor() {
        this._id = 0;
        this._nombre = "";
        this._foto = "";
        this._anio_lanzamiento = "";
        this._artista = "";
        this._foto_artista = "";
        this._canciones = [[], [], []];
        this._indice = 0;
        this._media = null;
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
        this._indice = 0;
    }
    set media(valor) {
        this._media = valor;
    }



    //Métodos.
    //Método para la reproducción de las canciones del album.
    reproducir() {
        if (this._canciones[0].length != 0) {
            this._media.src = this._canciones[2][this._indice];
            this._media.play()
        }
    }

    siguienteCancion() {
        if (!this._media.paused) {
            if (this._indice < this._canciones[0].length - 1) {
                this._indice++;
                this.reproducir();
            }
        }
    }
}