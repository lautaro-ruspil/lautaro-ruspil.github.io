document
	.getElementById("formSimulador")
	.addEventListener("submit", function (e) {
		e.preventDefault();

		// Capturamos elementos y valores
		const montoInput = document.getElementById("monto");
		const cuotasSelect = document.getElementById("cuotas");
		const errorMensaje = document.getElementById("errorMensaje");
		const resultadoDiv = document.getElementById("resultadoCuota");

		const resMonto = document.getElementById("resMonto");
		const resCuotas = document.getElementById("resCuotas");
		const resTasa = document.getElementById("resTasa");
		const resCuota = document.getElementById("resCuota");
		const resTotal = document.getElementById("resTotal");

		const monto = parseFloat(montoInput.value);
		const cuotas = parseInt(cuotasSelect.value);

		const tasaInteresAnual = 60; // 60% anual (ejemplo, puedes cambiar)
		const tasaInteresMensual = tasaInteresAnual / 12 / 100;

		// Validaciones simples
		if (!monto || monto < 1000) {
			errorMensaje.textContent =
				"Por favor, ingresá un monto válido mayor a $1000.";
			errorMensaje.classList.remove("d-none");
			resultadoDiv.style.display = "none";
			return;
		}
		if (!cuotas) {
			errorMensaje.textContent =
				"Por favor, elegí una cantidad de cuotas.";
			errorMensaje.classList.remove("d-none");
			resultadoDiv.style.display = "none";
			return;
		}

		errorMensaje.classList.add("d-none");

		// Fórmula cuota fija (amortización francesa)
		const i = tasaInteresMensual;
		const cuotaMensual = (monto * i) / (1 - Math.pow(1 + i, -cuotas));
		const totalPagar = cuotaMensual * cuotas;

		// Mostrar resultados con formato de moneda
		const formatoMoneda = new Intl.NumberFormat("es-AR", {
			style: "currency",
			currency: "ARS",
		});

		resMonto.textContent = formatoMoneda.format(monto);
		resCuotas.textContent = cuotas + " cuotas";
		resTasa.textContent = tasaInteresAnual + "% anual (fija)";
		resCuota.textContent = formatoMoneda.format(cuotaMensual);
		resTotal.textContent = formatoMoneda.format(totalPagar);

		resultadoDiv.style.display = "block";
	});