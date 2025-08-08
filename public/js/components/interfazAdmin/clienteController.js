import { getClientes, guardarClientes } from "./data.js";
import { mostrarSeccionClientes, cargarFormulario } from "./ui.js";
import { cargarClientesEnSelect } from "./creditos.js";
import { validarFormulario } from "./validaciones.js";

const campos = [
	"nombres",
	"apellidos",
	"dni",
	"direccion",
	"numero",
	"piso",
	"dpto",
	"telefono",
	"correo",
	"contrasenia",
	"monto",
	"cuotasIniciales",
	"cuotasPagas",
	"estadoCuenta",
];

function obtenerCamposFormulario() {
	return campos.reduce(
		(acc, key) => ({
			...acc,
			[key]: {
				input: document.getElementById(key),
				error: document.getElementById(`error-${key}`),
			},
		}),
		{}
	);
}

function obtenerValoresFormulario(camposForm) {
	return campos.reduce(
		(datos, key) => ({
			...datos,
			[key]: camposForm[key]?.input?.value?.trim() ?? "",
		}),
		{}
	);
}

function asociarEventosInputs(camposForm) {
	for (const key in camposForm) {
		const campo = camposForm[key];
		campo?.input?.addEventListener(
			"input",
			() => (campo.error.textContent = "")
		);
	}
}

function generarNuevoId(clientes) {
	return clientes.length ? Math.max(...clientes.map((c) => +c.id)) + 1 : 1;
}

export function procesarFormulario(e) {
	e.preventDefault();

	const camposForm = obtenerCamposFormulario();
	asociarEventosInputs(camposForm);

	if (!validarFormulario(camposForm)) return;

	const idRaw = document.getElementById("clienteId")?.value.trim();
	const id = idRaw ? +idRaw : null;
	const clientes = getClientes();
	const datos = obtenerValoresFormulario(camposForm);

	const nuevoCliente = {
		...datos,
		id: id ?? generarNuevoId(clientes),
		monto: +datos.monto,
		cuotasIniciales: +datos.cuotasIniciales,
		cuotasPagas: +datos.cuotasPagas,
	};

	if (id !== null && !isNaN(id)) {
		const idx = clientes.findIndex((c) => +c.id === id);
		if (idx === -1) return alert("Cliente no encontrado");
		clientes[idx] = nuevoCliente;
	} else {
		clientes.push(nuevoCliente);
	}

	guardarClientes(clientes);
	cargarClientesEnSelect();
	mostrarSeccionClientes();
}

export function editarCliente(id) {
	const cliente = getClientes().find((c) => +c.id === id);
	if (!cliente) return alert("Cliente no encontrado");
	cargarFormulario(cliente);
}

export function eliminarCliente(id) {
	if (!confirm("¿Está seguro que desea eliminar este cliente?")) return;
	const clientes = getClientes().filter((c) => +c.id !== id);
	guardarClientes(clientes);
	cargarClientesEnSelect();
	mostrarSeccionClientes();
}
