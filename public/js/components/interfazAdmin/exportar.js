import { getClientes } from "./data.js";

function getPagos() {
	return JSON.parse(localStorage.getItem("pagos")) || [];
}

export function inicializarExportaciones() {
	document
		.getElementById("btnExportarClientes")
		?.addEventListener("click", () =>
			exportExcel(getClientes(), "clientes", "Clientes")
		);
	document
		.getElementById("btnExportarPagos")
		?.addEventListener("click", () =>
			exportExcel(getPagos(), "pagos", "Pagos")
		);
}

async function exportExcel(datos, nombreArchivo, hojaNombre) {
	if (!datos.length) {
		alert("No hay datos para exportar.");
		return;
	}

	const wb = new ExcelJS.Workbook();
	const ws = wb.addWorksheet(hojaNombre);

	// Configurar columnas
	const columnas = Object.keys(datos[0]).map((key) => ({ header: key, key }));
	ws.columns = columnas;

	// Agregar datos
	datos.forEach((d) => ws.addRow(d));

	// Estilo encabezado
	ws.getRow(1).eachCell((cell) => {
		cell.font = { bold: true };
		cell.fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "FFD9E1F2" },
		};
		cell.alignment = { horizontal: "center" };
		cell.border = {
			top: { style: "thin" },
			left: { style: "thin" },
			bottom: { style: "thin" },
			right: { style: "thin" },
		};
	});

	// Estilos para filas y bordes
	ws.eachRow((row, index) => {
		if (index === 1) return; // Saltar encabezado
		const isStriped = index % 2 === 0;

		row.eachCell((cell) => {
			cell.fill = {
				type: "pattern",
				pattern: "solid",
				fgColor: { argb: isStriped ? "FFF2F2F2" : "FFFFFFFF" },
			};
			cell.border = {
				top: { style: "thin" },
				left: { style: "thin" },
				bottom: { style: "thin" },
				right: { style: "thin" },
			};

			// Formatos especiales
			if (["monto", "pagoMonto"].includes(cell._column?.key)) {
				cell.numFmt = '"$"#,##0.00';
			}
			if (["fecha", "pagoFecha"].includes(cell._column?.key)) {
				cell.numFmt = "yyyy-mm-dd";
			}
		});
	});

	// Autoajuste de columnas
	ws.columns.forEach((col) => {
		let max = col.header.length;
		col.eachCell({ includeEmpty: true }, (cell) => {
			let val = cell.value;
			if (typeof val === "number") {
				// Moneda necesita más espacio
				max = Math.max(max, 12);
			} else {
				const len = String(val || "").length;
				max = Math.max(max, len);
			}
		});
		col.width = max + 2;
	});

	// Generar y guardar
	const buffer = await wb.xlsx.writeBuffer();
	const blob = new Blob([buffer], {
		type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	});
	saveAs(blob, `${nombreArchivo}.xlsx`);
}
