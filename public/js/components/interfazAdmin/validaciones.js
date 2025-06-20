// Valida los campos del formulario antes de enviarlo
export function validarFormulario() {
	const nombres = document.getElementById("nombres").value.trim();
	const apellidos = document.getElementById("apellidos").value.trim();
	const dni = document.getElementById("dni").value.trim();
	const direccion = document.getElementById("direccion").value.trim();
	const telefono = document.getElementById("telefono").value.trim();

	// Expresiones regulares para validar solo letras o solo números
	const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
	const soloNumeros = /^\d+$/;

	// Validar nombres: mínimo 3 letras y solo caracteres alfabéticos
	if (nombres.length < 3 || !soloLetras.test(nombres)) {
		alert(
			"El nombre debe tener al menos 3 letras y solo contener caracteres alfabéticos."
		);
		return false;
	}

	// Validar apellidos: mínimo 3 letras y solo caracteres alfabéticos
	if (apellidos.length < 3 || !soloLetras.test(apellidos)) {
		alert(
			"El apellido debe tener al menos 3 letras y solo contener caracteres alfabéticos."
		);
		return false;
	}

	// Validar DNI: solo números y entre 7 y 8 dígitos
	if (!soloNumeros.test(dni) || dni.length < 7 || dni.length > 8) {
		alert("El DNI debe contener solo números y tener entre 7 y 8 dígitos.");
		return false;
	}

	// Validar dirección: al menos 2 caracteres (sin restricción de tipo)
	if (direccion.length < 2) {
		alert("La dirección debe contener al menos 2 caracteres.");
		return false;
	}

	// Validar teléfono: solo números y exactamente 10 dígitos
	if (!soloNumeros.test(telefono) || telefono.length !== 10) {
		alert(
			"El teléfono debe contener solo números y tener exactamente 10 dígitos."
		);
		return false;
	}
	return true; // Todo válido
}
