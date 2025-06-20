// js/clienteController.js
import {
	getClientes,
	setClientes,
	incrementIdCounter,
	guardarEnLocalStorage,
} from "./data.js";
import { validarFormulario } from "./validaciones.js";
import {
	limpiarFormulario,
	renderizarTablaConPaginacion,
	cargarFormulario,
} from "./ui.js";

// Procesa el formulario: valida, crea o actualiza cliente, guarda y actualiza UI
export function procesarFormulario(e) {
	e.preventDefault(); //Evita envío tradicional del formulario
	if (!validarFormulario()) return; // Si no pasa validación, no continuar

	const idExistente = document.getElementById("clienteId").value;
	const cliente = {
		id: idExistente || incrementIdCounter(), // Si existe ID, usarlo; si no, generar nuevo
		nombres: document.getElementById("nombres").value,
		apellidos: document.getElementById("apellidos").value,
		dni: document.getElementById("dni").value,
		direccion: document.getElementById("direccion").value,
		numero: document.getElementById("numero").value,
		piso: document.getElementById("piso").value,
		dto: document.getElementById("dto").value,
		telefono: document.getElementById("telefono").value,
		correo: document.getElementById("correo").value,
		usuario: document.getElementById("usuario").value,
        contrasena: document.getElementById("contrasena").value,
		monto: parseFloat(document.getElementById("monto").value),
		cuotasIniciales: parseInt(
			document.getElementById("cuotasIniciales").value
		),
		cuotasPagas: parseInt(document.getElementById("cuotasPagas").value),
		estadoCuenta: document.getElementById("estadoCuenta").value,
	};

	// Calcula cuotas pendientes a partir de iniciales y pagas
	cliente.cuotasPendientes = cliente.cuotasIniciales - cliente.cuotasPagas;

	const clientes = getClientes();

	if (idExistente) {
		// Actualiza cliente existente
		const actualizados = clientes.map((c) =>
			c.id == cliente.id ? cliente : c
		);
		setClientes(actualizados);
	} else {
		// Agrega nuevo cliente
		clientes.push(cliente);
	}

	guardarEnLocalStorage(); // Guarda cambios en localStorage
	renderizarTablaConPaginacion(); // Actualiza tabla en UI
	limpiarFormulario(); // Limpia formulario para nuevo ingreso
}

// Carga los datos del cliente seleccionado en el formulario para edición
export function editarCliente(id) {
	const cliente = getClientes().find((c) => c.id == id);
	cargarFormulario(cliente);
}

// Eliminar cliente tras confirmación actualiza almacenamiento y UI
export function eliminarCliente(id) {
	if (confirm("¿Desea eliminar este cliente?")) {
		const nuevosClientes = getClientes().filter((c) => c.id != id);
		setClientes(nuevosClientes);
		guardarEnLocalStorage();
		renderizarTablaConPaginacion();
	}
}
