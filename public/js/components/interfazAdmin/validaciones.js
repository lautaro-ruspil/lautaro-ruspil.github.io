export function validarFormulario(campos) {
	let valido = true;

	// Utilidades
	const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
	const soloNumeros = /^\d+$/;
	const correoValido = /^[^@]+@[^@]+\.(com)$/i;
	const contieneLetras = /[a-zA-Z]/;
	const contieneNumeros = /[0-9]/;
	const dptoValido = /^[A-Za-z0-9]+$/;

	const mostrarError = (campo, mensaje) =>
		campo?.error && (campo.error.textContent = mensaje);
	const limpiarError = (campo) =>
		campo?.error && (campo.error.textContent = "");

	// Crear errores si faltan
	Object.entries(campos).forEach(([key, campo]) => {
		if (!campo) return;

		if (!campo.error) {
			const errorDiv = document.createElement("div");
			errorDiv.className = "error-mensaje";
			errorDiv.id = `error-${key}`;
			campo.input?.parentElement?.appendChild(errorDiv);
			campo.error = errorDiv;
		}
	});

	// Validación general
	const requeridos = [
		"nombres",
		"apellidos",
		"dni",
		"telefono",
		"correo",
		"direccion",
		"numero",
		"contrasenia",
		"monto",
		"cuotasIniciales",
		"cuotasPagas",
		"estadoCuenta",
	];

	for (const key of requeridos) {
		const valor = campos[key]?.input?.value?.trim() ?? "";
		if (!valor) {
			mostrarError(campos[key], "Este campo es obligatorio.");
			valido = false;
		} else {
			limpiarError(campos[key]);
		}
	}

	// Validaciones individuales
	const reglas = [
		[
			"nombres",
			(v) => v.length >= 3 && soloLetras.test(v),
			"El nombre debe tener al menos 3 letras y solo letras.",
		],
		[
			"apellidos",
			(v) => v.length >= 3 && soloLetras.test(v),
			"El apellido debe tener al menos 3 letras y solo letras.",
		],
		[
			"dni",
			(v) => soloNumeros.test(v) && v.length >= 7 && v.length <= 8,
			"El DNI debe tener entre 7 y 8 números, sin guiones ni puntos.",
		],
		[
			"telefono",
			(v) => soloNumeros.test(v) && v.length === 10,
			"El teléfono debe tener 10 números.",
		],
		[
			"direccion",
			(v) => v.length >= 2,
			"La dirección debe tener al menos 2 caracteres.",
		],
		[
			"numero",
			(v) => soloNumeros.test(v),
			"Solo números en este campo.",
		],
		[
			"piso",
			(v) => !v || (soloNumeros.test(v) && +v > 0),
			"El piso debe ser numérico y positivo.",
		],
		[
			"dpto",
			(v) => !v || dptoValido.test(v),
			"El departamento debe ser alfanumérico sin espacios.",
		],
		[
			"correo",
			(v) => correoValido.test(v),
			"El correo debe ser válido, contener un @ y terminar en '.com'.",
		],
		[
			"contrasenia",
			(v) =>
				v.length >= 8 &&
				contieneLetras.test(v) &&
				contieneNumeros.test(v),
			"Debe tener al menos 8 caracteres, al menos una letra y al menos un número.",
		],
		[
			"monto",
			(v) => !isNaN(+v) && +v >= 1000,
			"El monto debe ser mayor o igual a 1000.",
		],
		[
			"cuotasIniciales",
			(v) => soloNumeros.test(v) && +v > 0,
			"Debe ser un número mayor a 0.",
		],
		[
			"cuotasPagas",
			(v) => soloNumeros.test(v) && +v >= 0,
			"Debe ser un número mayor o igual a 0.",
		],
		[
			"estadoCuenta",
			(v) => v.trim().length > 0,
			"Seleccione una opción válida.",
		],
	];

	for (const [key, validFn, mensaje] of reglas) {
		const valor = campos[key]?.input?.value.trim() ?? "";
		if (!validFn(valor)) {
			mostrarError(campos[key], mensaje);
			valido = false;
		}
	}

	return valido;
}
