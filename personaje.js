import { Inventario } from './inventario.js';

export class Personaje {
    #vida;
    #mana;
    #danioBase;
    #defensa;

    constructor(nombre, vida = 20, mana = 50, danioBase = 10, defensa = 5) {
        if (new.target === Personaje) throw new Error("El personaje es abstracto");
        this.nombre = nombre;
        this.#vida = vida;
        this.#mana = mana;
        this.#danioBase = danioBase;
        this.#defensa = defensa;
        this.inventario = new Inventario();
    }

    get vida() {
        return this.#vida
    }
    set vida(vida) {
        this.#vida = Math.max(0, vida);
    }

    get mana() {
        return this.#mana
    }
    set mana(mana) {
        this.#mana = Math.max(0, mana);
    }

    get danioBase() {
        return this.#danioBase
    }
    set danioBase(danio) {
        this.#danioBase = Math.max(0, danio);
    }

    get defensa() {
        return this.#defensa
    }
    set defensa(def) {
        this.#defensa = Math.max(0, def);
    }

    atacar() {
        throw new Error("Este método debe estar en la subclase")
    };

    defender(danio) {
        const danioReal = Math.max(0, danio - this.#defensa);
        this.vida = this.#vida - danioReal;
        return danioReal;
    }

    estaVivo() {
        return this.#vida > 0;
    }
}

export class Guerrero extends Personaje {
    atacar(objetivo) {
        const danio = this.danioBase + 2;
        const danioAplicado = objetivo.defender(danio);
        return `${this.nombre} golpea a ${objetivo.nombre} por ${danioAplicado} de daño`;
    }
}

export class Mago extends Personaje {
    atacar(objetivo) {
        if (this.mana >= 5) {
            this.mana -= 5;
            const danioAplicado = objetivo.defender(this.danioBase + 3)
            return `${this.nombre} ataca a ${objetivo.nombre} por ${danioAplicado} de daño`;
        } else {
            const danioAplicado = objetivo.defender(this.danioBase);
            return `${this.nombre} ataca a ${objetivo.nombre} por ${danioAplicado} de daño`;
        }
    }
}
