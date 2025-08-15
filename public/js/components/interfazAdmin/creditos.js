import { getClientes } from "./data.js";

// Carga las opciones de clientes en el <select> del crédito
export async function cargarClientesEnSelect() {
    const clientes = await getClientes();
    const select = document.getElementById("clienteCredito");
    if (!select) return;

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

// Configura la visualización del detalle del cliente seleccionado
export function configurarDetalleClienteCredito() {
    const select = document.getElementById("clienteCredito");
    const contenedor = document.getElementById("detalleCliente");
    if (!select || !contenedor) return;

    select.addEventListener("change", () => {
        const id = parseInt(select.value, 10);
        const cliente = getClientes().find((c) => +c.id === id);

        if (!cliente) {
            contenedor.innerHTML =
                "<p class='text-danger'>Cliente no encontrado.</p>";
            return;
        }

        const {
            nombres,
            apellidos,
            dni,
            direccion = "",
            numero = "",
            piso = "",
            dto = "",
            telefono = "-",
            correo = "-",
            monto = 0,
            cuotasIniciales = 0,
            cuotasPagas = 0,
            estadoCuenta = "",
        } = cliente;

        contenedor.innerHTML = `
			<div class="card p-3 shadow-sm">
				<h4 class="mb-3">Detalle del Cliente</h4>
				<p><strong>Nombre:</strong> ${nombres} ${apellidos}</p>
				<p><strong>DNI:</strong> ${dni}</p>
				<p><strong>Dirección:</strong> ${direccion} ${numero} ${piso} ${dto}</p>
				<p><strong>Teléfono:</strong> ${telefono}</p>
				<p><strong>Correo:</strong> ${correo}</p>
				<p><strong>Monto:</strong> $${parseFloat(monto).toFixed(2)}</p>
				<p><strong>Cuotas Iniciales:</strong> ${cuotasIniciales}</p>
				<p><strong>Cuotas Pagas:</strong> ${cuotasPagas}</p>
				<p><strong>Estado de Cuenta:</strong> ${estadoCuenta}</p>
			</div>
		`;
    });
}
