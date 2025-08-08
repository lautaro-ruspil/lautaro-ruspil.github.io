import { getClientes } from "./data.js";

function getPagos() {
	return JSON.parse(localStorage.getItem("pagos")) || [];
}

export function mostrarClientesEnMora() {
	const pagos = getPagos();
	const clientes = getClientes();
	const diasMora = 30;

	const hoy = new Date();

	const ultimoPagoPorCliente = {};
	pagos.forEach((p) => {
		const fechaPago = new Date(p.fecha);
		if (
			!ultimoPagoPorCliente[p.idCliente] ||
			fechaPago > new Date(ultimoPagoPorCliente[p.idCliente])
		) {
			ultimoPagoPorCliente[p.idCliente] = p.fecha;
		}
	});

	const enMora = clientes.filter((c) => {
		const cuotasPagas = +c.cuotasPagas || 0;
		const cuotasTotales = +c.cuotasIniciales || 0;
		const ultimaFecha = ultimoPagoPorCliente[c.id];

		if (cuotasPagas >= cuotasTotales) return false;

		if (!ultimaFecha) return true; // nunca pagó nada

		const diferencia = Math.floor(
			(hoy - new Date(ultimaFecha)) / (1000 * 60 * 60 * 24)
		);

		return diferencia > diasMora;
	});

	const contenedor = document.getElementById("clientesMora");
	if (!contenedor) return;

	if (enMora.length === 0) {
		contenedor.innerHTML = `<p class="text-success">Todos los clientes están al día 🟢</p>`;
		return;
	}

	let html = `<table class="table table-striped">
    <thead><tr><th>Cliente</th><th>Días sin pagar</th><th>Cuotas Pagas</th><th>Cuotas Totales</th><th>Último Pago</th></tr></thead><tbody>`;

	enMora.forEach((c) => {
		const ultima = ultimoPagoPorCliente[c.id]
			? new Date(ultimoPagoPorCliente[c.id])
			: null;
		const dias = ultima
			? Math.floor((hoy - ultima) / (1000 * 60 * 60 * 24))
			: "Nunca pagó";
		html += `<tr>
      <td>${c.nombres} ${c.apellidos}</td>
      <td>${dias}</td>
      <td>${c.cuotasPagas || 0}</td>
      <td>${c.cuotasIniciales || 0}</td>
      <td>${ultima ? ultima.toLocaleDateString() : "Sin pagos"}</td>
    </tr>`;
	});

	html += `</tbody></table>`;
	contenedor.innerHTML = html;
}
