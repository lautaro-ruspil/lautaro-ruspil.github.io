document.addEventListener("DOMContentLoaded", () => {
	const form = document.querySelector("form");

	// Campos del formulario
	const campos = {
		correo: { input: document.getElementById("correo"), error: null },
		contrasenia: {
			input: document.getElementById("contrasenia"),
			error: null,
		},
	};

	// Asignar divs de error si no existen
	for (const key in campos) {
		const campo = campos[key];
		let errorDiv =
			campo.input.parentElement.querySelector(".error-mensaje");
		if (!errorDiv) {
			errorDiv = document.createElement("div");
			errorDiv.className = "error-mensaje";
			campo.input.parentElement.appendChild(errorDiv);
		}
		campo.error = errorDiv;

		// Limpiar error al escribir
		campo.input.addEventListener("input", () => {
			campo.error.textContent = "";
		});
	}

	// Validar formulario
	function validarLogin() {
		let valido = true;

		// Reg Exp
		const correoValido = /^[^@]+@[^@]+\.(com)$/i;
		const contieneLetras = /[a-zA-Z]/;
		const contieneNumeros = /[0-9]/;

		const emailVal = campos.correo.input.value.trim();
		const passVal = campos.contrasenia.input.value.trim();

		if (!emailVal) {
			campos.correo.error.textContent = "El correo es obligatorio.";
			valido = false;
		} else if (!correoValido.test(emailVal)) {
			campos.correo.error.textContent =
				"El correo debe ser válido y terminar en '.com'.";
			valido = false;
		}

		if (!passVal) {
			campos.contrasenia.error.textContent =
				"La contraseña es obligatoria.";
			valido = false;
		} else if (
			passVal.length < 8 ||
			!contieneLetras.test(passVal) ||
			!contieneNumeros.test(passVal)
		) {
			campos.contrasenia.error.textContent =
				"La contraseña debe tener al menos 8 caracteres, letras y números.";
			valido = false;
		}

		return valido;
	}

	// Envío del formulario
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		if (!validarLogin()) return;

		const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
		const usuarioIngresado = campos.correo.input.value.trim();
		const passwordIngresada = campos.contrasenia.input.value.trim();

		const cliente = clientes.find(
			(c) =>
				c.correo === usuarioIngresado &&
				c.contrasenia === passwordIngresada
		);

		if (cliente) {
			const modalCarga = new bootstrap.Modal(
				document.getElementById("modalCarga")
			);
			modalCarga.show();

			sessionStorage.setItem("clienteLogueado", JSON.stringify(cliente));

			setTimeout(() => {
				modalCarga.hide();
				if (cliente.correo === "admin@admin.com") {
					window.location.href = "../paneles/interfazAdmin.html";
				} else {
					window.location.href = "../paneles/interfazCliente.html";
				}
			}, 2000);
		} else {
			campos.contrasenia.error.textContent =
				"Usuario o contraseña incorrectos.";
			campos.contrasenia.input.focus();
		}
	});

	// Toggle mostrar/ocultar contraseña
	const togglePassword = document.getElementById("togglePassword");
	const passwordInput = document.getElementById("contrasenia");

	togglePassword.addEventListener("click", () => {
		const type =
			passwordInput.getAttribute("type") === "password"
				? "text"
				: "password";
		passwordInput.setAttribute("type", type);

		// Cambia el icono
		togglePassword.classList.toggle("bi-eye");
		togglePassword.classList.toggle("bi-eye-slash");

		// Cambia aria-label para accesibilidad
		if (type === "password") {
			togglePassword.setAttribute("aria-label", "Mostrar contraseña");
		} else {
			togglePassword.setAttribute("aria-label", "Ocultar contraseña");
		}
	});
});
