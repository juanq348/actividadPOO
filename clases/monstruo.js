export class Monstruo {
    #vida;
    #defensa;
    
    constructor(nombre, vida = 30, defensa = 5) {
        this.nombre = nombre;
        this.#vida = vida;
        this.#defensa = defensa;
    }

    get vida() {
        return this.#vida
    }
    set vida(vida) {
        this.#vida = Math.max(0, vida);
    }

    get defensa() {
        return this.#defensa
    }
    set defensa(def) {
        this.#defensa = Math.max(0, def);
    }

    defender(danio) {
        const danioReal = Math.max(0, danio - this.#defensa);
        this.#vida -= danioReal;
        return danioReal;
    }

    atacar(objetivo) {
        const danioBase = 5 + Math.floor(Math.random() * 6);
        const danioAplicado = objetivo.defender(danioBase);
        return `${this.nombre} ataca a ${objetivo.nombre} por ${danioAplicado} de daño.`;
    }

    estaVivo() {
        return this.#vida > 0;
    }
}
