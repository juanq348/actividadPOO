class Personaje{
    #vida;
    #mana;
    #danioBase;
    #defensa;

    constructor(nombre, vida = 20, mana = 50, danioBase = 10, defensa = 5){
        if (new.target === Personaje) throw new Error("El personaje es abstracto");
            this.nombre = nombre;
            this.#vida = vida;
            this.#mana = mana;
            this.#danioBase = danioBase;
            this.#defensa = defensa;
            this.inventario = new Inventario();
    }

    get vida(){
        return this.#vida
    }
    set vida(v) {
        this.#vida = Math.max(0, v);
    }

    get mana(){
        return this.#mana
    }
    set mana(m){
        this.#mana = Math.max(0, m);
    }

    get danioBase(){
        return this.#danioBase
    }
    set danioBase(d){
        this.#danioBase = Math.max(0, d);
    }

    get defensa(){
        return this.#defensa
    }
    set defensa(def){
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

    estaVivo(){
        return this.#vida > 0;
    }
}

class Guerrero extends Personaje{
    atacar(objetivo){
        const danio = this.danioBase + 2;
        const danioAplicado = objetivo.defender(danio);
        return `${this.nombre} golpea a ${objetivo.nombre} por ${danioAplicado} de daño`;
    }
}

class Mago extends Personaje{
    atacar(objetivo){
        if(this.mana >= 5 ){
            this.mana -= 5;
            const danioAplicado = objetivo.defender(this.danioBase + 3)
            return `${this.nombre} ataca a ${objetivo.nombre} por ${danioAplicado} de daño`;
        } else {
            const danioAplicado = objetivo.defender(this.danioBase);
            return `${this.nombre} ataca a ${objetivo.nombre} por ${danioAplicado} de daño`;
        }
    }
}

class Monstruo{
    #vida;
    #defensa;
    constructor(nombre, vida = 30, defensa = 5)
    {
        this.nombre = nombre;
        this.#vida = vida;
        this.#defensa = defensa;
    }

    get vida(){
        return this.#vida
    }
    set vida(v) {
        this.#vida = Math.max(0, v);
    }

    get defensa(){
        return this.#defensa
    }
    set defensa(def){
        this.#defensa = Math.max(0, def);
    }

    defender(danio){
        const danioReal = Math.max(0, danio - this.#defensa);
        this.#vida -= danioReal;
        return danioReal;
    }

    atacar(objetivo){
        const danioBase = 5 + Math.floor(Math.random()*6);
        const danioAplicado = objetivo.defender(danioBase);
        return `${this.nombre} ataca a ${objetivo.nombre} por ${danioAplicado} de daño.`;
    }

    estaVivo(){
        return this.#vida > 0;
    }
}

class Item{
    constructor(nombre){
        if(new.target === Item) throw new Error("Item es abstracto");
        this.nombre = nombre
    }
    usar(){
        throw new Error("Esta en subclase");
    }
}

class Arma extends Item{
    constructor(nombre, bonificacion = 2){
        super(nombre);
        this.bonificacion = bonificacion;
    }
    usar(personaje){
        personaje.danioBase += this.bonificacion;
        return `${personaje.nombre} equipa ${this.nombre} (+${this.bonificacion} daño)`;
    }
}

class Pocion extends Item{
    constructor(nombre, cura = 20, manaExtra = 0){
        super(nombre);
        this.cura = cura;
        this.manaExtra = manaExtra;
    }
    usar(personaje){
        personaje.vida += this.cura;
        personaje.mana += this.manaExtra;
        return `${personaje.nombre} usa ${this.nombre}, recupera ${this.cura} vida y ${this.manaExtra} de mana`;
    }
}

class Inventario {
    constructor(){
        this.items = [];
    }

    agregarItem(item){
        this.items.push(item);
    }

    eliminarItem(nombre){
    this.items = this.items.filter(i => i.nombre !== nombre);
    }

    usarItem(nombre, personaje) {
        const item = this.items.find(i => i.nombre === nombre);
        if(!item) return "Item no encontrado";
        const mensaje = item.usar(personaje);
        this.eliminarItem(nombre);
        return mensaje
    }

    listaItems(){
        if(this.items.length === 0) return "Inventario vacío";
        return this.items.map(i => i.nombre).join(",");
    }
}

class Juego {
    constructor(){
        this.personajes = [];
        this.monstruos = [];
    }

    agregarPersonaje(personaje){
        this.personajes.push(personaje);
    }

    agregarMonstruo(monstruo){
        this.monstruos.push(monstruo);
    }

    pelea(jugador, monstruo){
        const logs = [];
        while(jugador.estaVivo() && monstruo.estaVivo()){
            logs.push(jugador.atacar(monstruo));
            if(!monstruo.estaVivo()){
                logs.push(`${monstruo.nombre} ha sido derrotado!`);
                break;
            }
            logs.push(monstruo.atacar(jugador));
            if(!jugador.estaVivo()){
                logs.push(`${jugador.nombre} ha caído. Juego Finalizado`);
                break;
            }
        }
        return logs;
    }
}

import promptSync from "prompt-sync";
const prompt = promptSync();

function mostrarMenu(){
    console.log("\n Menú ");
    console.log("1. Crear Personaje");
    console.log("2. Crear monstruo");
    console.log("3. Atacar");
    console.log("4. Usar ítem");
    console.log("5. Agregar ítem");
    console.log("0. Salir");
}

function cli(juego){
    let opcion = "";

    while(opcion !== "0"){
        mostrarMenu();
        opcion = prompt("Opción: ");

        switch(opcion){
            case "1":{
                const tipoPersonaje = prompt("Tipo de personaje (Guerrero / Mago): ").toLowerCase();
                const nombre = prompt("Nombre de tu personaje: ");
                let personaje;
                if(tipoPersonaje === "guerrero"){
                    personaje = new Guerrero(nombre);
                } else if(tipoPersonaje === "mago"){
                    personaje = new Mago(nombre);
                } else {
                    console.log("Tipo inválido");
                    break;
                }
                personaje.inventario.agregarItem(new Pocion("Pocion de mana",5 , 20));
                juego.agregarPersonaje(personaje);
                console.log(`${tipoPersonaje.charAt(0).toUpperCase() + tipoPersonaje.slice(1)} ${nombre} ha sido creado.`);
                break
            }
            case "2":{
                const nombre = prompt("Nombre del monstruo: ");
                const monstruo = new Monstruo(nombre);
                juego.agregarMonstruo(monstruo);
                console.log(`Monstruo ${nombre} ha sido creado`);
                break
            }
            case "3":{
                if (!juego.personajes.length || !juego.monstruos.length){
                    console.log("Debes crear un personaje y un monstruo primero.");
                    break;
                } else {
                    const logs = juego.pelea(juego.personajes[0], juego.monstruos[0]);
                    logs.forEach(l => console.log(l))
                    break;
                }
            }
            case "4":{
                if(!juego.personajes.length){
                    console.log("No hay personaje para usar ítem");
                    break;
                }
                const p = juego.personajes[0];
                console.log("Inventario: " + p.inventario.listaItems());
                const nombreItem = prompt("Nombre del ítem a usar: ");
                console.log(p.inventario.usarItem(nombreItem, p));
                break;
            }
            case "5":{
                if(!juego.personajes.length){
                    console.log("No hay personaje creado");
                    break;
                }
                    const tipoItem = prompt("Tipo de ítem (arma / pocion): ").toLowerCase();
                    const nombre = prompt("Nombre del ítem: ");
                    const p = juego.personajes[0];
                    if(tipoItem === "arma"){
                        p.inventario.agregarItem(new Arma(nombre));
                    } else if(tipoItem === "pocion") p.inventario.agregarItem(new Pocion(nombre));
                    else console.log("Tipo inválido");
                    break;
                }
                case "0":
                    console.log("Saliendo...");
                    break;
                default:
                    console.log(("Opción inválida"));
        }
    }
}

function pruebas(){
    console.log("PRUEBAS");
    const juego = new Juego();
    const guerrero = new Guerrero("Patica");
    const monstruo = new Monstruo("Payo");
    const pocion = new Pocion("Poción grande", 50);
    const arma = new Arma("Espada", 5);
    juego.agregarPersonaje(guerrero);
    juego.agregarMonstruo(monstruo);

    console.log("Inventario inicial:", guerrero.inventario.listaItems());
    guerrero.inventario.agregarItem(pocion);
    guerrero.inventario.agregarItem(arma);

    console.log("Estado inicial:");
    console.log(guerrero);
    console.log(monstruo);

    console.log("\nUsando ítem Pocion:");
    guerrero.inventario.usarItem("Poción grande", guerrero);

    console.log("\nEquipando arma:");
    guerrero.inventario.usarItem("Espada", guerrero);

    console.log("\nPelea:");
    juego.pelea(guerrero, monstruo).forEach(l => console.log(l));

    console.log("\nFIN DE PRUEBAS");
}

pruebas();
const juego = new Juego();
cli(juego);