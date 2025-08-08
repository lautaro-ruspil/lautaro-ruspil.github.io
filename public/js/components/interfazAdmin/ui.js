import { getClientes } from "./data.js";
import { editarCliente, eliminarCliente } from "./clienteController.js";

let perPage = 5;
let curPage = 1;

function ocultarTodasLasSecciones() {
	document
		.querySelectorAll(".seccionSistema")
		.forEach((s) => (s.style.display = "none"));
}

export function mostrarSeccionClientes() {
	ocultarTodasLasSecciones();
	document.getElementById("seccionClientes").style.display = "block";
	renderizarTablaConPaginacion();
}

export function mostrarSeccionRegistro() {
	ocultarTodasLasSecciones();
	document.getElementById("seccionRegistro").style.display = "block";
	document.getElementById("volverRegistroBtn").style.display = "none";
	limpiarFormulario();
}

export function cargarFormulario(cliente) {
	const keys = [
		"clienteId",
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

	keys.forEach((key) => {
		const input = document.getElementById(key);
		if (input) input.value = cliente[key] ?? "";
	});

	document.getElementById("clienteId").value = cliente.id || "";

	ocultarTodasLasSecciones();
	document.getElementById("seccionRegistro").style.display = "block";
}

function limpiarFormulario() {
	const form = document.getElementById("clienteForm");
	if (form) form.reset();
	document.getElementById("clienteId").value = "";
}

export function renderizarTablaConPaginacion() {
	const clientes = getClientes();
	const total = Math.max(Math.ceil(clientes.length / perPage), 1);
	curPage = Math.min(curPage, total);

	const inicio = (curPage - 1) * perPage;
	const visibles = clientes.slice(inicio, inicio + perPage);

	const htmlEscritorio = visibles.length
		? visibles
				.map(
					(cliente) => `
			<tr data-id="${cliente.id}">
				<td>${cliente.nombres}</td>
				<td>${cliente.apellidos}</td>
				<td>${cliente.dni}</td>
				<td>${cliente.telefono}</td>
				<td>${cliente.correo}</td>
				<td>$${cliente.monto}</td>
				<td>${cliente.estadoCuenta}</td>
				<td>
					<button class="btn btn-sm btn-editar">Editar</button>
					<button class="btn btn-sm btn-eliminar">Eliminar</button>
				</td>
			</tr>`
				)
				.join("")
		: `<tr><td colspan="8" class="text-center">No hay clientes</td></tr>`;

	const htmlMobile = visibles.length
		? visibles
				.map(
					(cliente) => `
			<div class="card mb-3 shadow-sm border-primary" data-id="${cliente.id}">
				<div class="card-body">
					<div class="row">
						${[
							["Nombres", cliente.nombres],
							["Apellidos", cliente.apellidos],
							["DNI", cliente.dni],
							["Teléfono", cliente.telefono],
							["Correo", cliente.correo],
							["Monto", `$${cliente.monto}`],
							["Estado", cliente.estadoCuenta],
						]
							.map(
								([k, v]) => `
							<div class="col-6"><strong>${k}:</strong></div>
							<div class="col-6 text-end">${v}</div>`
							)
							.join("")}
						<div class="col-12 text-end mt-3">
							<button class="btn btn-sm btn-editar me-2">Editar</button>
							<button class="btn btn-sm btn-eliminar">Eliminar</button>
						</div>
					</div>
				</div>
			</div>`
				)
				.join("")
		: `<p class="text-center">No hay clientes</p>`;

	document.getElementById("tablaContenedor").innerHTML = `
		<div class="d-none d-md-block">
			<table class="table table-striped table-bordered align-middle">
				<thead class="table-primary text-center">
					<tr>
						<th>Nombres</th><th>Apellidos</th><th>DNI</th>
						<th>Teléfono</th><th>Correo</th><th>Monto</th>
						<th>Estado</th><th>Acciones</th>
					</tr>
				</thead>
				<tbody>${htmlEscritorio}</tbody>
			</table>
		</div>
		<div class="d-md-none">${htmlMobile}</div>`;

	renderizarPaginacion(total);
	asociarEventosTabla();
}

function renderizarPaginacion(total) {
	const html = Array.from(
		{ length: total },
		(_, i) => `
		<li class="page-item ${curPage === i + 1 ? "active" : ""}">
			<a href="#" class="page-link page-num" data-page="${i + 1}">${i + 1}</a>
		</li>`
	).join("");

	document.getElementById("paginacion").innerHTML = `
		<ul class="pagination justify-content-center">${html}</ul>`;
}

function asociarEventosTabla() {
	const contenedor = document.getElementById("tablaContenedor");

	contenedor.onclick = (e) => {
		const row = e.target.closest("[data-id]");
		if (!row) return;

		const id = +row.dataset.id;
		if (e.target.classList.contains("btn-editar")) editarCliente(id);
		else if (e.target.classList.contains("btn-eliminar"))
			eliminarCliente(id);
	};

	document.getElementById("paginacion").onclick = (e) => {
		if (e.target.classList.contains("page-num")) {
			e.preventDefault();
			const nueva = +e.target.dataset.page;
			if (nueva !== curPage) {
				curPage = nueva;
				renderizarTablaConPaginacion();
			}
		}
	};
}
