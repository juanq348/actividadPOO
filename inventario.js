export class Inventario {
    constructor() {
        this.items = [];
    }

    agregarItem(item) {
        this.items.push(item);
    }

    eliminarItem(nombre) {
        this.items = this.items.filter(i => i.nombre !== nombre);
    }

    usarItem(nombre, personaje) {
        const item = this.items.find(i => i.nombre === nombre);
        if (!item) return "Item no encontrado";
        const mensaje = item.usar(personaje);
        this.eliminarItem(nombre);
        return mensaje
    }

    listaItems() {
        if (this.items.length === 0) return "Inventario vacío";
        return this.items.map(i => i.nombre).join(",");
    }
}
