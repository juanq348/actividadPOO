# Juego RPG
Consiste en una simulación de un juego RPG por consola. Donde vas a poder crear personaje y monstruos, simular ataques, gestionar tus ítems y ver que objetos tienes.

---

## Ejecución
1. Clonar repositorio:
```bash
  git clone https://github.com/juanq348/actividadPOO
```
2. Instalar dependencias:
```bash
  npm install
```
3. Ejecutar el protecto:
```bash
  node index.js
```

---
## Diagrama de Clases
---
## Ejemplos de uso
### Ejemplo 1 - Creación de Mago y un monstruo, despúes atacar.

```bash
Menú
1. Crear Personaje
2. Crear monstruo
3. Atacar
4. Usar ítem
5. Agregar ítem
0. Salir
Opción:1
Tipo de personaje (Guerrero / Mago): Mago
Nombre de tu personaje:Odin
Mago Odin ha sido creado.


Menú
1. Crear Personaje
2. Crear monstruo
3. Atacar
4. Usar ítem
5. Agregar ítem
0. Salir
Opción:1
Nombre de monstruo:Orco
Monstruo Orco ha sido creado.


Menú
1. Crear Personaje
2. Crear monstruo
3. Atacar
4. Usar ítem
5. Agregar ítem
0. Salir
Opción:3
Odin ataca a Orco por 8 de daño
Orco ataca a Odin por 3 de daño.
Odin ataca a Orco por 8 de daño
Orco ataca a Odin por 1 de daño.
Odin ataca a Orco por 8 de daño
Orco ataca a Odin por 4 de daño.
Odin ataca a Orco por 8 de daño
Orco ha sido derrotado!
```

### Ejemplo 2 - Usar un ítem
```bash
Menú
1. Crear Personaje
2. Crear monstruo
3. Atacar
4. Usar ítem
5. Agregar ítem
0. Salir
Opción:4
Inventario: Pocion de mana
Nombre del ítem a usar: Pocion de mana
Odin usa Pocion de mana, recupera 0 vida y 20 de mana
```

### Ejemplo 3 - Agregar un ítem
```bash
 Menú
1. Crear Personaje
2. Crear monstruo
3. Atacar
4. Usar ítem
5. Agregar ítem
0. Salir
Opción:5
Tipo de ítem (arma / pocion):arma
Nombre del ítem:Excalibur
```
