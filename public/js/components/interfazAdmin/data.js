// js/data.js
let clientes = []; // Array que almacena los clientes en memoria
let idCounter = 1; // Contador para asignar IDs únicos a nuevos clientes

// Devuelve el array actual de clientes
export function getClientes() {
	return clientes;
}

// Reemplaza el array de clientes con uno nuevo
export function setClientes(newClientes) {
	clientes = newClientes;
}

// Devuelve el valor actual del contador de IDs
export function getIdCounter() {
	return idCounter;
}

// Incrementa el contador de IDs y devuelve el valor previo (para asignar nuevo ID)
export function incrementIdCounter() {
	return idCounter++;
}

// Guarda en localStorage el array de clientes y el contador de IDs
export function guardarEnLocalStorage() {
	localStorage.setItem("clientes", JSON.stringify(clientes));
	localStorage.setItem("idCounter", idCounter.toString());
}

// Carga los datos almacenados en localStorage si existen y actualiza variables
export function cargarDesdeLocalStorage() {
	const data = localStorage.getItem("clientes");
	const contador = localStorage.getItem("idCounter");

	if (data) {
		clientes = JSON.parse(data);
	}
	if (contador) {
		idCounter = parseInt(contador);
	}
}
