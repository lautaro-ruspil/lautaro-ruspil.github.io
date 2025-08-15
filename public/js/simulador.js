// Capturamos elementos y valores
const montoInput = document.getElementById("monto");
const errorMensaje = document.getElementById("errorMensaje");
const cuotasSelect = document.getElementById("cuotas");
const resultadoDiv = document.getElementById("resultadoCuota");

const resMonto = document.getElementById("resMonto");
const resCuotas = document.getElementById("resCuotas");
const resTasa = document.getElementById("resTasa");
const resCuota = document.getElementById("resCuota");
const resTotal = document.getElementById("resTotal");

const tasaInteresAnual = 60; // 60% anual (ejemplo)
const tasaInteresMensual = tasaInteresAnual / 12 / 100;

// Aviso de simulación
const avisoSimulacion = document.getElementById("avisoSimulacion");
avisoSimulacion.textContent =
    "⚠️ Esto es una simulación. El monto solicitado está sujeto a análisis y aprobación crediticia.";

// Rangos de monto y cuotas disponibles
const rangosCuotas = [
    { min: 1000, max: 50000, cuotas: [6, 12, 18] },
    { min: 50001, max: 200000, cuotas: [12, 24, 36] },
    { min: 200001, max: 500000, cuotas: [24, 36, 48] },
];

montoInput.addEventListener("keydown", function (e) {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault();
});

document
    .getElementById("formSimulador")
    .addEventListener("submit", function (e) {
        e.preventDefault();

        const monto = parseFloat(montoInput.value);
        const cuotas = parseInt(cuotasSelect.value);

        // Validaciones
        if (!monto || monto < 1000) {
            errorMensaje.textContent =
                "Por favor, ingresá un monto válido mayor a $1000.";
            errorMensaje.classList.remove("d-none");
            resultadoDiv.style.display = "none";
            return;
        }

        // Validar que las cuotas estén permitidas para ese monto
        const rangoValido = rangosCuotas.find(
            (r) => monto >= r.min && monto <= r.max
        );
        if (!rangoValido || !rangoValido.cuotas.includes(cuotas)) {
            errorMensaje.textContent = `Para este monto, las cuotas disponibles son: ${
                rangoValido
                    ? rangoValido.cuotas.join(", ")
                    : "no hay opciones disponibles"
            }.`;
            errorMensaje.classList.remove("d-none");
            resultadoDiv.style.display = "none";
            return;
        }

        errorMensaje.classList.add("d-none");

        // Cálculo cuota fija (amortización francesa)
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
