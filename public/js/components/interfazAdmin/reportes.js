// Importa funciones para acceder a los clientes y para mostrar clientes en mora
import { getClientes } from "./data.js";
import { mostrarClientesEnMora } from "./clientesMora.js";
function getPagos() {
	// Devuelve todos los pagos almacenados en localStorage (o un array vacío)
	return JSON.parse(localStorage.getItem("pagos")) || [];
}

export function inicializarReportes() {
	renderEstadoGeneral(); // Reporte de estado general (activos, deuda, promedio cuotas)
	renderIngresos(); // Reporte mensual de ingresos y por cliente
	renderTopClientes(); // Ranking de los 5 clientes que más pagaron
	mostrarClientesEnMora(); // Muestra clientes con deuda vencida
}

function renderEstadoGeneral() {
	// Trae todos los clientes
	const clientes = getClientes();

	// Trae todos los pagos
	const pagos = getPagos();

	// Cuenta los clientes con estado "Activo"
	const activos = clientes.filter((c) => c.estadoCuenta === "Activo").length;

	// Suma el total de pagos realizados
	const totalPagado = pagos.reduce((acc, p) => acc + +p.monto, 0);

	// Calcula deuda pendiente (cuotas restantes * monto por cuota)
	const totalPendiente = clientes.reduce((acc, c) => {
		const cuotasRestantes =
			(+c.cuotasIniciales || 0) - (+c.cuotasPagas || 0);
		const cuotaMonto = (+c.monto || 0) / (+c.cuotasIniciales || 1);
		return acc + cuotasRestantes * cuotaMonto;
	}, 0);

	// Promedio de cuotas pagadas por cliente
	const promedioCuotasPagas =
		clientes.reduce((acc, c) => acc + (+c.cuotasPagas || 0), 0) /
		(clientes.length || 1);

	// Crea HTML con los datos obtenidos
	const html = `
    <li class="list-group-item">Clientes activos: <strong>${activos}</strong></li>
    <li class="list-group-item">Total recuperado: <strong>$${totalPagado.toFixed(
		2
	)}</strong></li>
    <li class="list-group-item">Total deuda pendiente: <strong>$${totalPendiente.toFixed(
		2
	)}</strong></li>
    <li class="list-group-item">Promedio cuotas pagas: <strong>${promedioCuotasPagas.toFixed(
		2
	)}</strong></li>
  `;

	document.getElementById("estadoGeneral").innerHTML = html;
	// Inserta el HTML en el contenedor correspondiente
}

function renderIngresos() {
	const pagos = getPagos();
	const clientes = getClientes();

	// Agrupar por mes
	const ingresosPorMes = {}; // Ej: { "2025-06": 12000 }
	const totalPorCliente = {}; // Ej: { "1": 5000, "2": 7000 }

	pagos.forEach((p) => {
		const mes = p.fecha.slice(0, 7); // Extrae "AAAA-MM" de la fecha
		ingresosPorMes[mes] = (ingresosPorMes[mes] || 0) + +p.monto;

		totalPorCliente[p.idCliente] =
			(totalPorCliente[p.idCliente] || 0) + +p.monto;
	});

	// Tabla de ingresos por mes
	let html = `<table class="table table-striped"><thead>
    <tr><th>Mes</th><th>Ingreso Total</th></tr></thead><tbody>`;

	Object.entries(ingresosPorMes)
		.sort()
		.forEach(([mes, total]) => {
			html += `<tr><td>${mes}</td><td>$${total.toFixed(2)}</td></tr>`;
		});
	html += `</tbody></table>`;

	// Lista de total por cliente
	html += `<h5 class="mt-4">Total por Cliente</h5><ul class="list-group">`;
	Object.entries(totalPorCliente).forEach(([id, monto]) => {
		const cliente = clientes.find((c) => c.id == id);
		if (cliente) {
			html += `<li class="list-group-item">${cliente.nombres} ${
				cliente.apellidos
			} – $${monto.toFixed(2)}</li>`;
		}
	});
	html += `</ul>`;

	document.getElementById("tablaIngresos").innerHTML = html;
}

// Función que muestra los 5 clientes que más dinero pagaron en total
function renderTopClientes() {
	const pagos = getPagos();
	const clientes = getClientes();

	const mapa = {}; // { idCliente: totalPagado }

	pagos.forEach((p) => {
		mapa[p.idCliente] = (mapa[p.idCliente] || 0) + +p.monto;
	});

	// Ordena por monto total descendente y toma los 5 primeros
	const top = Object.entries(mapa)
		.sort((a, b) => b[1] - a[1])
		.slice(0, 5);

	// Genera HTML con la lista Top
	const html = top
		.map(([id, monto]) => {
			const cliente = clientes.find((c) => c.id == id);
			return cliente
				? `<li class="list-group-item">${cliente.nombres} ${
						cliente.apellidos
				  } – $${monto.toFixed(2)}</li>`
				: "";
		})
		.join("");

	document.getElementById("topClientes").innerHTML = html;
}
