import { getClientes, guardarClientes } from "./data.js";

export function inicializarPagos() {
	const form = document.getElementById("formPago");
	const selectCliente = document.getElementById("pagoCliente");
	const contenedorHistorial = document.getElementById(
		"historialPagosContenedor"
	);

	if (!form || !selectCliente || !contenedorHistorial) return;

	cargarClientesEnSelect(selectCliente);
	mostrarMensajeSeleccionCliente(contenedorHistorial);

	form.addEventListener("submit", (e) => {
		e.preventDefault();

		const idCliente = Number(selectCliente.value);
		const fecha = form.pagoFecha.value.trim();
		const monto = parseFloat(form.pagoMonto.value);
		const medio = form.pagoMedio.value.trim();
		const observacion = form.pagoObservacion.value.trim();

		if (!idCliente || !fecha || isNaN(monto) || !medio) {
			alert("Todos los campos excepto observación son obligatorios");
			return;
		}

		const pago = {
			idPago: Date.now(),
			idCliente,
			fecha,
			monto,
			medio,
			observacion,
		};

		const pagos = getPagos();
		pagos.push(pago);
		guardarPagos(pagos);

		actualizarEstadoClienteConPago(idCliente, monto);
		mostrarHistorialPagos(idCliente, contenedorHistorial);
		form.reset();
	});

	selectCliente.addEventListener("change", () => {
		const idCliente = Number(selectCliente.value);
		if (idCliente) {
			mostrarHistorialPagos(idCliente, contenedorHistorial);
		} else {
			mostrarMensajeSeleccionCliente(contenedorHistorial);
		}
	});
}

function cargarClientesEnSelect(select) {
	const clientes = getClientes();
	select.innerHTML = '<option value="">Seleccione un cliente</option>';

	clientes.forEach(({ id, nombres, apellidos }) => {
		if (id && nombres && apellidos) {
			const option = document.createElement("option");
			option.value = id;
			option.textContent = `${nombres} ${apellidos}`;
			select.appendChild(option);
		}
	});
}

export function getPagos() {
	return JSON.parse(localStorage.getItem("pagos")) || [];
}

function guardarPagos(pagos) {
	localStorage.setItem("pagos", JSON.stringify(pagos));
}

function actualizarEstadoClienteConPago(idCliente, montoPagado) {
	const clientes = getClientes();
	const cliente = clientes.find((c) => c.id === idCliente);
	if (!cliente) return;

	const montoPorCuota = cliente.monto / cliente.cuotasIniciales;
	const nuevasCuotas = Math.floor(montoPagado / montoPorCuota);
	cliente.cuotasPagas = (cliente.cuotasPagas || 0) + nuevasCuotas;

	if (cliente.cuotasPagas >= cliente.cuotasIniciales) {
		cliente.estadoCuenta = "Finalizado";
	}

	guardarClientes(clientes);
}

function mostrarHistorialPagos(idCliente, contenedor) {
	if (!contenedor) return;

	const pagos = getPagos().filter((p) => p.idCliente === idCliente);

	if (pagos.length === 0) {
		contenedor.innerHTML =
			"<p class='text-muted'>No hay pagos registrados.</p>";
		return;
	}

	const filas = pagos
		.map(
			({ fecha, monto, medio, observacion }) => `
				<tr>
					<td class="text-nowrap">${fecha}</td>
					<td class="text-nowrap">$${monto.toFixed(2)}</td>
					<td class="text-nowrap">${medio}</td>
					<td class="text-nowrap">${observacion || "-"}</td>
				</tr>`
		)
		.join("");

	contenedor.innerHTML = `
		<div class="table-responsive">
			<table class="table table-bordered table-hover text-center align-middle">
				<thead class="table-light">
					<tr>
						<th class="text-nowrap">Fecha</th>
						<th class="text-nowrap">Monto</th>
						<th class="text-nowrap">Medio</th>
						<th class="text-nowrap">Observación</th>
					</tr>
				</thead>
				<tbody>${filas}</tbody>
			</table>
		</div>`;
}

function mostrarMensajeSeleccionCliente(contenedor) {
	contenedor.innerHTML =
		"<p>Seleccione un cliente para ver el historial.</p>";
}
