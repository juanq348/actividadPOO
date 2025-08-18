export class Juego {
    constructor() {
        this.personajes = [];
        this.monstruos = [];
    }

    agregarPersonaje(personaje) {
        this.personajes.push(personaje);
    }

    agregarMonstruo(monstruo) {
        this.monstruos.push(monstruo);
    }

    pelea(jugador, monstruo) {
        const logs = [];
        while (jugador.estaVivo() && monstruo.estaVivo()) {
            logs.push(jugador.atacar(monstruo));
            if (!monstruo.estaVivo()) {
                logs.push(`${monstruo.nombre} ha sido derrotado!`);
                break;
            }
            logs.push(monstruo.atacar(jugador));
            if (!jugador.estaVivo()) {
                logs.push(`${jugador.nombre} ha caído. Juego Finalizado`);
                break;
            }
        }
        return logs;
    }
}
