// Exporta la función principal que inicializa el simulador
export function inicializarSimulador() {
	// Obtiene el formulario de simulación por su ID
	const form = document.getElementById("formSimulador");

	// Obtiene el contenedor donde se mostrarán los resultados
	const resultado = document.getElementById("resultadoSimulador");

	// Escucha el evento de envío del formulario
	form.addEventListener("submit", (e) => {
		e.preventDefault(); // Evita que la página se recargue al enviar el formulario

		// Obtiene los valores ingresados por el usuario y los convierte a número
		const monto = parseFloat(document.getElementById("simMonto").value); // Monto del préstamo
		const cuotas = parseInt(document.getElementById("simCuotas").value); // Cantidad de cuotas
		const interesMensual =
			parseFloat(document.getElementById("simInteres").value) / 100; // Interés mensual en decimal

		// Valida que los valores ingresados sean válidos
		if (monto <= 0 || cuotas <= 0) {
			// Muestra mensaje de error si el monto o las cuotas no son válidos
			resultado.innerHTML = `<p class="text-danger">Valores inválidos</p>`;
			return;
		}

		// Cálculo de la cuota fija usando la fórmula del sistema francés:
		// cuota = (monto * interés) / (1 - (1 + interés)^-cuotas)
		const cuota =
			(monto * interesMensual) /
			(1 - Math.pow(1 + interesMensual, -cuotas));

		// Calcula el total a pagar (cuota * cantidad de cuotas)
		const total = cuota * cuotas;

		// Genera el HTML con el resumen de la simulación
		let tabla = `<h5 class="mt-3">Resumen:</h5>
      <ul class="list-group mb-3">
        <li class="list-group-item">Cuota mensual estimada: <strong>$${cuota.toFixed(
			2
		)}</strong></li>
        <li class="list-group-item">Total a pagar: <strong>$${total.toFixed(
			2
		)}</strong></li>
        <li class="list-group-item">Interés total: <strong>$${(
			total - monto
		).toFixed(2)}</strong></li>
      </ul>`;

		// Crea una tabla con el detalle cuota por cuota
		tabla += `<table class="table table-striped">
        <thead><tr><th>N° Cuota</th><th>Monto</th><th>Acumulado</th></tr></thead><tbody>`;

		// Rellena la tabla con cada cuota mensual y su acumulado
		for (let i = 1; i <= cuotas; i++) {
			tabla += `<tr><td>${i}</td><td>$${cuota.toFixed(2)}</td><td>$${(
				cuota * i
			).toFixed(2)}</td></tr>`;
		}

		// Cierra la tabla
		tabla += `</tbody></table>`;

		// Inserta el resultado final en el contenedor
		resultado.innerHTML = tabla;
	});
}
