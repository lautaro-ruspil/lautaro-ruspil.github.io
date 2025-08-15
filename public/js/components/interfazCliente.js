// interfazCliente.js (ES Module)
// Funcionalidades:
// - Carga datos desde sessionStorage (clienteLogueado) o usa datos de ejemplo si no hay.
// - Rellena resumen, detalles y tabla de cuotas.
// - Abre modal con detalle al hacer click en una fila.
// - Genera comprobante PDF simple por cuota y descarga de plan (PDF).
// - Muestra alerta y aplica clase 'btn-urgente' si hay cuota próxima/vencida.
// - Dibuja gráfico de progreso con Chart.js

document.addEventListener("DOMContentLoaded", () => {
    // Obtener datos desde sessionStorage o usar ejemplo (para desarrollo)
    const datosStored = sessionStorage.getItem("clienteLogueado");
    const ejemplo = {
        nombres: "Juan",
        apellidos: "Pérez",
        dni: "12.345.678",
        telefono: "+54 9 11 1234-5678",
        correo: "juan.perez@example.com",
        direccion: "Calle Falsa",
        numero: "123",
        monto: 12000,
        tasa: 45,
        plazoMeses: 12,
        cuotasIniciales: 12,
        cuotasPagas: 5,
        cuotas: [
            {
                num: 1,
                fecha: "2025-01-10",
                monto: 1000,
                capital: 800,
                interes: 200,
                saldo: 11000,
                estado: "pagado",
            },
            {
                num: 2,
                fecha: "2025-02-10",
                monto: 1000,
                capital: 800,
                interes: 200,
                saldo: 10000,
                estado: "pagado",
            },
            {
                num: 3,
                fecha: "2025-03-10",
                monto: 1000,
                capital: 800,
                interes: 200,
                saldo: 9000,
                estado: "pagado",
            },
            {
                num: 4,
                fecha: "2025-04-10",
                monto: 1000,
                capital: 800,
                interes: 200,
                saldo: 8000,
                estado: "pagado",
            },
            {
                num: 5,
                fecha: "2025-05-10",
                monto: 1000,
                capital: 800,
                interes: 200,
                saldo: 7000,
                estado: "pagado",
            },
            {
                num: 6,
                fecha: "2025-08-12",
                monto: 1000,
                capital: 800,
                interes: 200,
                saldo: 6000,
                estado: "pendiente",
            },
            {
                num: 7,
                fecha: "2025-09-12",
                monto: 1000,
                capital: 800,
                interes: 200,
                saldo: 5000,
                estado: "atrasado",
            },
            // ... puede continuar
        ],
        fechaInicio: "2025-01-10",
        fechaFin: "2026-01-10",
        estadoCuenta: "Al día",
    };
    const datos = datosStored ? JSON.parse(datosStored) : ejemplo;

    // Helpers
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);
    const formatCurrency = (n) =>
        new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
            minimumFractionDigits: 2,
        }).format(n);

    // ELEMENTOS
    const proxCuotaEl = $("#proxCuota");
    const proxFechaEl = $("#proxFecha");
    const cuotasPagasEl = $("#cuotasPagasCard");
    const estadoCuentaEl = $("#estadoCuentaCard");
    const barraProgresoEl = $("#barraProgreso");
    const montoOtorgadoEl = $("#montoOtorgado");
    const tasaCreditoEl = $("#tasaCredito");
    const plazoCreditoEl = $("#plazoCredito");
    const saldoRestanteEl = $("#saldoRestante");
    const fechaInicioEl = $("#fechaInicio");
    const fechaFinEl = $("#fechaFin");
    const alertaEl = $("#alertaCliente");
    const tablaTbody = $("#tablaCuotas tbody");
    const btnPagarAhora = $("#btnPagarAhora");
    const btnDescargarPlan = $("#btnDescargarPlan");

    // 1) Rellenar datos principales
    if (montoOtorgadoEl)
        montoOtorgadoEl.textContent = formatCurrency(datos.monto ?? 0);
    if (tasaCreditoEl) tasaCreditoEl.textContent = (datos.tasa ?? 0) + "%";
    if (plazoCreditoEl)
        plazoCreditoEl.textContent =
            (datos.plazoMeses ?? datos.cuotasIniciales ?? "--") + " meses";
    if (saldoRestanteEl) {
        // intentar calcular saldo como monto - cuotasPagas * valor cuota (si no hay saldo explícito)
        const valorCuota =
            datos.monto && datos.cuotasIniciales
                ? datos.monto / datos.cuotasIniciales
                : 0;
        const saldo =
            datos.saldoRestante ?? datos.monto - datos.cuotasPagas * valorCuota;
        saldoRestanteEl.textContent = formatCurrency(saldo ?? 0);
    }
    if (fechaInicioEl)
        fechaInicioEl.textContent = datos.fechaInicio ?? "dd/mm/aaaa";
    if (fechaFinEl) fechaFinEl.textContent = datos.fechaFin ?? "dd/mm/aaaa";
    if (estadoCuentaEl) estadoCuentaEl.textContent = datos.estadoCuenta ?? "—";

    // 2) Resumen de próxima cuota y progreso
    const cuotasTotales =
        datos.cuotasIniciales ?? (datos.cuotas ? datos.cuotas.length : 0);
    const cuotasPagas =
        datos.cuotasPagas ??
        datos.cuotas?.filter((c) => c.estado === "pagado").length ??
        0;
    const cuotasRestantes = cuotasTotales - cuotasPagas;
    const valorCuota =
        datos.monto && cuotasTotales
            ? datos.monto / cuotasTotales
            : datos.cuotas && datos.cuotas[0]
            ? datos.cuotas[0].monto
            : 0;

    if (proxCuotaEl) proxCuotaEl.textContent = formatCurrency(valorCuota ?? 0);
    // buscar próxima cuota pendiente (primera con estado distinto a pagado)
    let proxima = datos.cuotas
        ? datos.cuotas.find((c) => c.estado !== "pagado")
        : null;
    if (!proxima && datos.cuotas && datos.cuotas.length === 0) proxima = null;
    const proxFechaTexto = proxima
        ? proxima.fecha
        : (() => {
              const hoy = new Date();
              hoy.setMonth(hoy.getMonth() + 1);
              return hoy.toLocaleDateString("es-AR");
          })();
    if (proxFechaEl) proxFechaEl.textContent = proxFechaTexto;

    if (cuotasPagasEl)
        cuotasPagasEl.textContent = `${cuotasPagas} / ${cuotasTotales} cuotas pagadas`;

    const progresoPercent =
        cuotasTotales > 0 ? Math.round((cuotasPagas / cuotasTotales) * 100) : 0;
    if (barraProgresoEl) barraProgresoEl.style.width = `${progresoPercent}%`;

    // 3) Mostrar alerta si próxima cuota vence pronto o está vencida
    const parseDate = (dStr) => {
        // espera dd/mm/yyyy
        const parts = dStr?.split?.("/");
        if (!parts || parts.length !== 3) return null;
        const [dd, mm, yyyy] = parts.map((s) => parseInt(s, 10));
        return new Date(yyyy, mm - 1, dd);
    };
    let mostrarAlerta = false;
    if (proxima && proxima.fecha) {
        const fechaProx = parseDate(proxima.fecha);
        const hoy = new Date();
        if (fechaProx) {
            const diffMs = fechaProx - hoy;
            const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
            if (diffDays <= 3 && diffDays >= 0) {
                alertaEl.textContent = `⚠️ Tu próxima cuota vence el ${proxima.fecha} (en ${diffDays} día(s)).`;
                mostrarAlerta = true;
            } else if (diffDays < 0) {
                alertaEl.textContent = `❗ Tu cuota del ${
                    proxima.fecha
                } está vencida (${Math.abs(diffDays)} día(s)).`;
                mostrarAlerta = true;
            }
        }
    }
    if (mostrarAlerta) {
        alertaEl.classList.remove("d-none");
        btnPagarAhora.classList.add("btn-urgente");
    } else {
        alertaEl.classList.add("d-none");
        btnPagarAhora.classList.remove("btn-urgente");
    }

    // 4) Dibujar gráfico (doughnut)
    try {
        const chartEl = document.getElementById("graficoProgreso");
        if (chartEl) {
            const rojo =
                getComputedStyle(document.documentElement)
                    .getPropertyValue("--rojo")
                    .trim() || "#dc3545";
            const chart = new Chart(chartEl, {
                type: "doughnut",
                data: {
                    labels: ["Pagado", "Restante"],
                    datasets: [
                        {
                            data: [
                                cuotasPagas,
                                Math.max(0, cuotasTotales - cuotasPagas),
                            ],
                            backgroundColor: [rojo, "#e9ecef"],
                            borderWidth: 0,
                        },
                    ],
                },
                options: {
                    cutout: "70%",
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: (ctx) => `${ctx.label}: ${ctx.parsed}`,
                            },
                        },
                    },
                },
            });
        }
    } catch (e) {
        console.warn("Chart.js no inicializado:", e);
    }

    // 5) Poblar la tabla de cuotas
    function estadoBadge(estado) {
        if (!estado) return '<span class="badge bg-secondary">—</span>';
        estado = estado.toLowerCase();
        if (estado === "pagado")
            return '<span class="badge bg-success">Pagado</span>';
        if (estado === "pendiente")
            return '<span class="badge bg-warning text-dark">Pendiente</span>';
        if (estado === "atrasado" || estado === "vencida")
            return '<span class="badge bg-danger">Atrasado</span>';
        return `<span class="badge bg-secondary">${estado}</span>`;
    }

    function renderTabla() {
        tablaTbody.innerHTML = "";
        if (!datos.cuotas || datos.cuotas.length === 0) {
            // si no vienen cuotas, generar una serie básica
            for (let i = 1; i <= cuotasTotales; i++) {
                const pagado = i <= cuotasPagas;
                const fecha = "—";
                const monto = valorCuota;
                const row = {
                    num: i,
                    fecha,
                    monto,
                    capital: monto * 0.8,
                    interes: monto * 0.2,
                    saldo: Math.max(0, datos.monto - i * monto),
                    estado: pagado ? "pagado" : "pendiente",
                };
                datos.cuotas = datos.cuotas || [];
                datos.cuotas.push(row);
            }
        }

        datos.cuotas.forEach((c) => {
            const tr = document.createElement("tr");
            tr.dataset.num = c.num;
            tr.dataset.fecha = c.fecha;
            tr.dataset.monto = c.monto;
            tr.dataset.capital = c.capital;
            tr.dataset.interes = c.interes;
            tr.dataset.saldo = c.saldo;
            tr.dataset.estado = c.estado;

            tr.innerHTML = `
        <td>${c.num}</td>
        <td>${c.fecha}</td>
        <td>${formatCurrency(c.monto)}</td>
        <td>${estadoBadge(c.estado)}</td>
        <td>
          <button class="btn btn-sm btn-outline-azul btn-comprobante" data-num="${
              c.num
          }">
            <i class="bi bi-file-earmark-pdf"></i> Comprobante
          </button>
        </td>
      `;

            // click en fila => abrir modal (salvo que se cliquee el botón comprobante)
            tr.addEventListener("click", (evt) => {
                if (evt.target.closest(".btn-comprobante")) return; // si pulsó el botón, no abrir modal
                openModalDetalle(tr);
            });

            tablaTbody.appendChild(tr);
        });

        // listeners para botones comprobante (ahora que existen)
        document.querySelectorAll(".btn-comprobante").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                const num = btn.dataset.num;
                const fila = btn.closest("tr");
                const cuotaData = {
                    num: fila.dataset.num,
                    fecha: fila.dataset.fecha,
                    monto: parseFloat(fila.dataset.monto),
                    capital: parseFloat(fila.dataset.capital),
                    interes: parseFloat(fila.dataset.interes),
                    saldo: parseFloat(fila.dataset.saldo),
                };
                generarComprobantePDF(cuotaData);
            });
        });
    }

    renderTabla();

    // 6) Modal: abrir con datos
    function openModalDetalle(tr) {
        $("#detalleNum").textContent = tr.dataset.num;
        $("#detalleFecha").textContent = tr.dataset.fecha;
        $("#detalleMonto").textContent = formatCurrency(
            Number(tr.dataset.monto || 0)
        );
        $("#detalleCapital").textContent = formatCurrency(
            Number(tr.dataset.capital || 0)
        );
        $("#detalleInteres").textContent = formatCurrency(
            Number(tr.dataset.interes || 0)
        );
        $("#detalleSaldo").textContent = formatCurrency(
            Number(tr.dataset.saldo || 0)
        );
        const modalEl = document.getElementById("modalDetalleCuota");
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
    }

    // 7) Generar comprobante PDF simple con jsPDF
    function generarComprobantePDF(cuota) {
        try {
            const { jsPDF } = window.jspdf || {};
            if (!jsPDF) {
                alert("No se pudo generar PDF (biblioteca no cargada).");
                return;
            }
            const doc = new jsPDF({ unit: "pt", format: "a4" });
            const left = 40;
            let y = 60;
            doc.setFontSize(18);
            doc.text("Rapicréditos - Comprobante de pago", left, y);
            y += 30;
            doc.setFontSize(12);
            doc.text(`N° de cuota: ${cuota.num}`, left, y);
            y += 18;
            doc.text(`Fecha de vencimiento: ${cuota.fecha}`, left, y);
            y += 18;
            doc.text(`Monto: ${formatCurrency(cuota.monto)}`, left, y);
            y += 18;
            doc.text(`Capital: ${formatCurrency(cuota.capital)}`, left, y);
            y += 18;
            doc.text(`Intereses: ${formatCurrency(cuota.interes)}`, left, y);
            y += 18;
            doc.text(
                `Saldo después de pago: ${formatCurrency(cuota.saldo)}`,
                left,
                y
            );
            y += 30;
            doc.setFontSize(10);
            doc.text(
                "Este comprobante es un documento generado por Rapicréditos.",
                left,
                y
            );
            doc.save(`comprobante-cuota-${cuota.num}.pdf`);
        } catch (err) {
            console.error(err);
            alert("Error generando PDF. Revisa la consola.");
        }
    }

    // 8) Descargar plan completo (resumen) — PDF simple
    btnDescargarPlan.addEventListener("click", () => {
        try {
            const { jsPDF } = window.jspdf || {};
            if (!jsPDF) {
                alert("No se pudo generar PDF (biblioteca no cargada).");
                return;
            }
            const doc = new jsPDF({ unit: "pt", format: "a4" });
            const left = 40;
            let y = 60;
            doc.setFontSize(18);
            doc.text("Rapicréditos - Plan de pago", left, y);
            y += 30;
            doc.setFontSize(12);
            doc.text(
                `Cliente: ${datos.nombres ?? ""} ${datos.apellidos ?? ""}`,
                left,
                y
            );
            y += 18;
            doc.text(
                `Monto otorgado: ${formatCurrency(datos.monto ?? 0)}`,
                left,
                y
            );
            y += 18;
            doc.text(`Plazo: ${cuotasTotales} cuotas`, left, y);
            y += 25;
            doc.setFontSize(11);

            // Cabecera tabla simple
            doc.text("N°  Fecha       Monto       Estado", left, y);
            y += 14;
            doc.setLineWidth(0.5);
            doc.line(left, y, 550, y);
            y += 8;

            datos.cuotas.forEach((c) => {
                const line = `${c.num
                    .toString()
                    .padEnd(3, " ")} ${c.fecha.padEnd(
                    11,
                    " "
                )} ${formatCurrency(c.monto).padEnd(12, " ")} ${c.estado}`;
                if (y > 750) {
                    doc.addPage();
                    y = 60;
                }
                doc.text(line, left, y);
                y += 16;
            });

            doc.save("plan-de-pagos.pdf");
        } catch (err) {
            console.error(err);
            alert("Error generando PDF del plan.");
        }
    });

    // 9) Acción del botón "Pagar ahora" (aquí solo un ejemplo: redirigir o abrir pasarela)
    btnPagarAhora.addEventListener("click", () => {
        // Aquí deberías redirigir a tu pasarela o abrir modal de pago.
        // Por demo, mostramos una alerta.
        window.location.href = "/pagar.html"; // cambia a la ruta real de pago o implementa la acción real
    });
});

document
    .getElementById("formSolicitudCredito")
    .addEventListener("submit", function (e) {
        e.preventDefault();
        const monto = document.getElementById("montoSolicitud").value;
        const cuotas = document.getElementById("cuotasSolicitud").value;

        console.log("Solicitud enviada:", { monto, cuotas });

        // Aquí podrías hacer un fetch POST a tu backend
        // fetch('/api/solicitarCredito', { method: 'POST', body: JSON.stringify({ monto, cuotas, cbuAlias }), headers: { 'Content-Type': 'application/json' } });

        alert("Solicitud enviada correctamente");
        const modal = bootstrap.Modal.getInstance(
            document.getElementById("modalSolicitudCredito")
        );
        modal.hide();
        this.reset();
    });
