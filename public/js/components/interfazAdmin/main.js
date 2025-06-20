// js/main.js
import { mostrarSeccionClientes, mostrarSeccionRegistro } from "./ui.js";
import {
	procesarFormulario,
	editarCliente,
	eliminarCliente,
} from "./clienteController.js";
import { cargarDesdeLocalStorage } from "./data.js";

// Se ejecuta al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
	cargarDesdeLocalStorage(); // Carga datos guardados previamente
	mostrarSeccionRegistro(); // Muestra el formulario inicialmente
});

// Escucha el envío del formulario y llama al controlador para procesarlo
document
	.getElementById("clienteForm")
	.addEventListener("submit", procesarFormulario);

// Botón para mostrar la sección de clientes (tabla)
document
	.getElementById("verClientesBtn")
	.addEventListener("click", mostrarSeccionClientes);

// Botón para volver a la sección de registro (formulario)
document
	.getElementById("volverRegistroBtn")
	.addEventListener("click", mostrarSeccionRegistro);

// Expone funciones globalmente para que los botones inline puedan usarla
window.editarCliente = editarCliente;
window.eliminarCliente = eliminarCliente;

// Función para cambiar de página (paginación), importa dinamicamente el módulo ui.js
window.cambiarPagina = function (pagina) {
	import("./ui.js").then((mod) => mod.cambiarPagina(pagina));
};
