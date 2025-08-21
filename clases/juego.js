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
            logs.push(`Vida de ${jugador.nombre}: ${jugador.vida} | Vida de ${monstruo.nombre}: ${monstruo.vida}`);
            if (!monstruo.estaVivo()) {
                logs.push(`${monstruo.nombre} ha sido derrotado!`);
                this.monstruos = this.monstruos.filter(monstruoArray => monstruoArray !== monstruo);
                break;
            }
            logs.push(monstruo.atacar(jugador));
            logs.push(`Vida de ${jugador.nombre}: ${jugador.vida} | Vida de ${monstruo.nombre}: ${monstruo.vida} \n`);
            if (!jugador.estaVivo()) {
                logs.push(`${jugador.nombre} ha caído. Juego Finalizado`);
                this.personajes = this.personajes.filter(personaje => personaje !== jugador);
                break;
            }
        }
        return logs;
    }
}
