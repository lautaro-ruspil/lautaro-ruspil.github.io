// ===== Importaciones =====
import { mostrarSeccionRegistro, mostrarSeccionClientes } from "./ui.js";
import { procesarFormulario } from "./clienteController.js";

// ===== Configuración del formulario de cliente =====
export function configurarFormularioCliente() {
	const form = document.getElementById("clienteForm");
	const btnRegistrar = document.querySelector(
		"#seccionClientes .btn-success"
	);
	const btnCancelar = document.querySelector("#clienteForm .btn-secondary");

	const btnVerClientes = document.querySelector("#btnVerClientes");

	// Mostrar sección de registro al hacer clic en "Registrar nuevo cliente"
	btnRegistrar?.addEventListener("click", () => {
		form?.reset(); // Limpiar el formulario
		mostrarSeccionRegistro(); // Mostrar la sección para agregar cliente
	});

	// Procesar el formulario al enviarlo
	form?.addEventListener("submit", procesarFormulario);

	// Volver a la vista de clientes al cancelar
	btnCancelar?.addEventListener("click", mostrarSeccionClientes);

	// Volver a la vista de clientes al presionar el boton ver clientes
	btnVerClientes?.addEventListener("click", mostrarSeccionClientes);
}
