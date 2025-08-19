export class Item {
    constructor(nombre) {
        if (new.target === Item) throw new Error("Item es abstracto");
        this.nombre = nombre
    }
    usar() {
        throw new Error("Esta en subclase");
    }
}

export class Arma extends Item {
    constructor(nombre, bonificacion = 2) {
        super(nombre);
        this.bonificacion = bonificacion;
    }
    usar(personaje) {
        personaje.danioBase += this.bonificacion;
        return `${personaje.nombre} equipa ${this.nombre} (+${this.bonificacion} daño)`;
    }
}

export class Pocion extends Item {
    constructor(nombre, cura = 20, manaExtra = 0) {
        super(nombre);
        this.cura = cura;
        this.manaExtra = manaExtra;
    }
    usar(personaje) {
        personaje.vida += this.cura;
        personaje.mana += this.manaExtra;
        return `${personaje.nombre} usa ${this.nombre}, recupera ${this.cura} vida y ${this.manaExtra} de mana`;
    }
}
