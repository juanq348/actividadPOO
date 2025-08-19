import promptSync from "prompt-sync";
import { Guerrero, Mago } from './personaje.js';
import { Monstruo } from './monstruo.js';
import { Arma, Pocion } from './item.js';

const prompt = promptSync();

function mostrarMenu() {
    console.log("\n Menú ");
    console.log("1. Crear Personaje");
    console.log("2. Crear monstruo");
    console.log("3. Atacar");
    console.log("4. Usar ítem");
    console.log("5. Agregar ítem");
    console.log("0. Salir");
}

export function interfaz(juego) {
    let opcion = "";

    while (opcion !== "0") {
        mostrarMenu();
        opcion = prompt("Opción: ");

        switch (opcion) {
            case "1": {
                const tipoPersonaje = prompt("Tipo de personaje (Guerrero / Mago): ").toLowerCase();
                const nombre = prompt("Nombre de tu personaje: ");
                let personaje;
                if (tipoPersonaje === "guerrero") {
                    personaje = new Guerrero(nombre);
                } else if (tipoPersonaje === "mago") {
                    personaje = new Mago(nombre);
                } else {
                    console.log("Tipo inválido");
                    break;
                }
                personaje.inventario.agregarItem(new Pocion("Pocion de mana", 5, 20));
                juego.agregarPersonaje(personaje);
                console.log(`${tipoPersonaje.charAt(0).toUpperCase() + tipoPersonaje.slice(1)} ${nombre} ha sido creado.`);
                break
            }
            case "2": {
                const nombre = prompt("Nombre del monstruo: ");
                const monstruo = new Monstruo(nombre);
                juego.agregarMonstruo(monstruo);
                console.log(`Monstruo ${nombre} ha sido creado`);
                break
            }
            case "3": {
                if (!juego.personajes.length || !juego.monstruos.length) {
                    console.log("Debes crear un personaje y un monstruo primero.");
                    break;
                } else {
                    const logs = juego.pelea(juego.personajes[0], juego.monstruos[0]);
                    logs.forEach(l => console.log(l))
                    break;
                }
            }
            case "4": {
                if (!juego.personajes.length) {
                    console.log("No hay personaje para usar ítem");
                    break;
                }
                const personaje = juego.personajes[0];
                console.log("Inventario: " + personaje.inventario.listaItems());
                const nombreItem = prompt("Nombre del ítem a usar: ");
                console.log(p.inventario.usarItem(nombreItem, personaje));
                break;
            }
            case "5": {
                if (!juego.personajes.length) {
                    console.log("No hay personaje creado");
                    break;
                }
                const tipoItem = prompt("Tipo de ítem (arma / pocion): ").toLowerCase();
                const nombre = prompt("Nombre del ítem: ");
                const personaje = juego.personajes[0];
                if (tipoItem === "arma") {
                    personaje.inventario.agregarItem(new Arma(nombre));
                } else if (tipoItem === "pocion") personaje.inventario.agregarItem(new Pocion(nombre));
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
