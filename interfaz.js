import promptSync from "prompt-sync";
import { Guerrero, Mago } from './clases/personaje.js';
import { Monstruo } from './clases/monstruo.js';
import { Arma, Pocion } from './clases/item.js';

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
                let tipoOpcion = "";
                do {
                    tipoOpcion = prompt("Tipo de personaje: 1) Guerrero  2) Mago  (0 para cancelar): ").trim();
                    if (tipoOpcion === "0") {
                        console.log("Creación cancelada.");
                        break;
                    }
                    if (tipoOpcion !== "1" && tipoOpcion !== "2") {
                        console.log("Opción inválida. Elija 1 o 2.");
                    }
                } while (tipoOpcion !== "1" && tipoOpcion !== "2" && tipoOpcion !== "0");

                if (tipoOpcion === "0") break;

                let nombre = "";
                do {
                    nombre = prompt("Nombre de tu personaje: ").trim();
                    if (!nombre) console.log("El nombre no puede estar vacío.");
                } while (!nombre);

                let personaje;
                let tipoTexto;
                if (tipoOpcion === "1") {
                    personaje = new Guerrero(nombre);
                    tipoTexto = "Guerrero";
                } else if (tipoOpcion === "2") {
                    personaje = new Mago(nombre);
                    tipoTexto = "Mago";
                }

                personaje.inventario.agregarItem(new Pocion("Pocion de mana", 5, 20));
                juego.agregarPersonaje(personaje);
                console.log(`${tipoTexto} ${nombre} ha sido creado.`);
                break
            }
            case "2": {
                let nombre = "";
                do {
                    nombre = prompt("Nombre del monstruo: ").trim();
                    if (!nombre) console.log("El nombre no puede estar vacío.");
                } while (!nombre);
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
                    logs.forEach(log => console.log(log))
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
                console.log(personaje.inventario.usarItem(nombreItem, personaje));
                break;
            }
            case "5": {
                if (!juego.personajes.length) {
                    console.log("No hay personaje creado");
                    break;
                }
                let tipoItemOpcion = "";
                do {
                    tipoItemOpcion = prompt("Tipo de ítem: 1) Arma  2) Poción  (0 para cancelar): ").trim();
                    if (tipoItemOpcion === "0") {
                        console.log("Operación cancelada.");
                        break;
                    }
                    if (tipoItemOpcion !== "1" && tipoItemOpcion !== "2") {
                        console.log("Opción inválida. Elija 1 o 2.");
                    }
                } while (tipoItemOpcion !== "1" && tipoItemOpcion !== "2" && tipoItemOpcion !== "0");

                if (tipoItemOpcion === "0") break;

                let nombre = "";
                do {
                    nombre = prompt("Nombre del ítem: ").trim();
                    if (!nombre) console.log("El nombre no puede estar vacío.");
                } while (!nombre);

                const personaje = juego.personajes[0];
                if (tipoItemOpcion === "1") {
                    personaje.inventario.agregarItem(new Arma(nombre));
                } else if (tipoItemOpcion === "2") {
                    personaje.inventario.agregarItem(new Pocion(nombre));
                }
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
