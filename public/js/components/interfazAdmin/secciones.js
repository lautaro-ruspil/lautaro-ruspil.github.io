// Muestra una sección del sistema según el ID (como "clientes", "reportes", etc.)
export function mostrarSeccion(id) {
	// Oculta todas las secciones del sistema
	document.querySelectorAll(".seccionSistema").forEach((s) => {
		s.style.display = "none";
	});

	if (!id || typeof id !== "string") return;

	// Convierte el id a formato Capitalizado y busca la sección correspondiente
	const seccion = document.getElementById(`seccion${capitalizar(id)}`);
	if (seccion) seccion.style.display = "block";
}

// Capitaliza la primera letra de una palabra: "clientes" → "Clientes"
function capitalizar(texto) {
	if (typeof texto !== "string" || texto.length === 0) return "";
	return texto.charAt(0).toUpperCase() + texto.slice(1);
}
