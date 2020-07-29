//Clase de la cancion.

class Cancion {
    constructor() {
        this._id = 0;
        this._nombre = "";
        this._url = "";
        this._idgenero = 0;
        this._artista = "";
        this._media = "";
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

    set media(valor) {
        this._media = valor;
    }

    //Métodos.
    reproducir() {
        this._media.play();
    }

    //Pausar
    pausar() {
        this._media.pause();
    }

        //Detener.
        detenerCancion() {
            this._media.load();
        }

            //Mute.
    silencioSonido() {
        if (this._media.muted) {
            this._media.muted = false;
        }else{
            this._media.muted = true;
        }
    }

    //Adelantar la canción.
    adelantar() {
        if (this._media.src != "" && !this._media.paused && !this._media.ended) {
            if (this._media.currentTime + 15 < this._media.duration) {
                this._media.currentTime += 10;
            }
        }
    }

    //retroceder la canción.
    retroceder() {
        if (this._media.src != "" && !this._media.paused && !this._media.ended) {
            if (this._media.currentTime - 15 > 0) {
                this._media.currentTime -= 10;
            }
        }
    }
  
}  
