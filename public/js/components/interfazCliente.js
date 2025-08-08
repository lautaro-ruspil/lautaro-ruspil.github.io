document.addEventListener("DOMContentLoaded", () => {
	const datos = JSON.parse(sessionStorage.getItem("clienteLogueado"));
	if (!datos) {
		const contenedor = document.getElementById("datosCliente");
		if (contenedor) {
			contenedor.innerHTML =
				"<p class='text-danger'>No hay cliente autenticado.</p>";
		}
		return;
	}

	// ========== Mostrar datos en "Mi perfil" ==========
	const contenedor = document.getElementById("datosCliente");

if (contenedor) {
	const piso = datos.piso ? `, Piso ${datos.piso}` : "";
	const dto = datos.dto ? `, Dto ${datos.dto}` : "";

	// Validamos cuotasPendientes si no existe, la calculamos
	if (typeof datos.cuotasPendientes === "undefined" && 
		typeof datos.cuotasIniciales === "number" && 
		typeof datos.cuotasPagas === "number") {
		datos.cuotasPendientes = datos.cuotasIniciales - datos.cuotasPagas;
	}

	contenedor.innerHTML = `
		<div class="col-md-6">
			<p><strong>Nombre:</strong> ${datos.nombres} ${datos.apellidos}</p>
			<p><strong>DNI:</strong> ${datos.dni}</p>
			<p><strong>Teléfono:</strong> ${datos.telefono}</p>
			<p><strong>Correo:</strong> ${datos.correo}</p>
			<p><strong>Dirección:</strong> ${datos.direccion} ${datos.numero}${piso}${dto}</p>
		</div>
		<div class="col-md-6">
			
			<p><strong>Monto Solicitado:</strong> $${datos.monto.toFixed(2)}</p>
			<p><strong>Cuotas Iniciales:</strong> ${datos.cuotasIniciales}</p>
			<p><strong>Cuotas Pagas:</strong> ${datos.cuotasPagas}</p>
			<p><strong>Cuotas Pendientes:</strong> ${datos.cuotasPendientes ?? "No disponible"}</p>
			<p><strong>Estado de Cuenta:</strong> ${datos.estadoCuenta}</p>
		</div>
	`;
}


	// ========== Mostrar datos en el resumen principal ==========
	const proxCuota = document.getElementById("proxCuota");
	const proxFecha = document.getElementById("proxFecha");
	const cuotasPagas = document.getElementById("cuotasPagasCard");
	const estadoCuenta = document.getElementById("estadoCuentaCard");

	if (proxCuota && datos.monto && datos.cuotasIniciales) {
		const valorCuota = datos.monto / datos.cuotasIniciales;
		proxCuota.textContent = `$ ${valorCuota.toFixed(2)}`;
	}

	if (proxFecha) {
		const hoy = new Date();
		hoy.setDate(hoy.getDate() + 30);
		proxFecha.textContent = hoy.toLocaleDateString("es-AR");
	}

	if (cuotasPagas) {
		cuotasPagas.textContent = `${datos.cuotasPagas} / ${datos.cuotasIniciales}`;
	}

	if (estadoCuenta) {
		estadoCuenta.textContent = datos.estadoCuenta;
	}
});
