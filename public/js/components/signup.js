// Elementos pasos y círculos
const steps = document.querySelectorAll(".step");
const circles = document.querySelectorAll(".step-circle");
let currentStep = 0;

function showStep(i) {
    steps.forEach((s, idx) => s.classList.toggle("active", idx === i));
    circles.forEach((c, idx) => c.classList.toggle("active", idx === i));
    currentStep = i;
}
showStep(currentStep);

// Campos del formulario
const campos = {
    nombres: { input: document.getElementById("nombre"), error: null },
    apellidos: { input: document.getElementById("apellido"), error: null },
    dni: { input: document.getElementById("dni"), error: null },
    dniNroTramite: {
        input: document.getElementById("dniNumeroTramite"),
        error: null,
    },
    telefono: { input: document.getElementById("telefono"), error: null },
    correo: { input: document.getElementById("correo"), error: null },
    direccion: { input: document.getElementById("direccion"), error: null },
    numero: { input: document.getElementById("numero"), error: null },
    piso: { input: document.getElementById("piso"), error: null },
    dpto: { input: document.getElementById("dpto"), error: null },
    contrasenia: { input: document.getElementById("contrasenia"), error: null },
    metodoVerificacion: {
        input: document.getElementById("metodo-verificacion"),
        error: null,
    },
    codigo: { input: document.getElementById("codigo"), error: null },
    dniFrente: { input: document.getElementById("dni-frente"), error: null },
    dniDorso: { input: document.getElementById("dni-dorso"), error: null },
    selfieDni: { input: document.getElementById("selfie-dni"), error: null },
    reciboSueldo: {
        input: document.getElementById("recibo-sueldo"),
        error: null,
    },
};

// Asignar errores y eventos
for (const key in campos) {
    const campo = campos[key];
    let errorDiv = campo.input.parentElement.querySelector(".error-mensaje");
    if (!errorDiv) {
        errorDiv = document.createElement("div");
        errorDiv.className = "error-mensaje";
        campo.input.parentElement.appendChild(errorDiv);
    }
    campo.error = errorDiv;

    campo.input.addEventListener("input", () => {
        campo.error.textContent = "";

        if (key === "metodoVerificacion") {
            contenedorCodigo.style.display = "none";
            reenviarTexto.style.display = "none";
            campos.codigo.input.value = "";
            campos.codigo.error.textContent = "";
        }
    });
}

// Variables paso 2
const metodoSelect = campos.metodoVerificacion.input;
const contenedorCodigo = document.getElementById("contenedor-codigo");
const labelCodigo = document.getElementById("label-codigo");
const inputCodigo = campos.codigo.input;
const reenviarTexto = document.getElementById("reenviarTexto");

metodoSelect.addEventListener("change", function () {
    if (!this.value) {
        contenedorCodigo.style.display = "none";
        reenviarTexto.style.display = "none";
        return;
    }
    contenedorCodigo.style.display = "block";
    reenviarTexto.style.display = "block";

    if (this.value === "email") {
        labelCodigo.textContent = "Código enviado al correo electrónico";
        inputCodigo.placeholder = "Ingresa el código recibido por correo";
    } else if (this.value === "sms") {
        labelCodigo.textContent = "Código enviado por SMS";
        inputCodigo.placeholder = "Ingresa el código recibido por teléfono";
    }
});

reenviarTexto.querySelector("a").addEventListener("click", (e) => {
    e.preventDefault();
    let mensajeReenviado = document.getElementById("mensajeReenviado");
    if (!mensajeReenviado) {
        mensajeReenviado = document.createElement("div");
        mensajeReenviado.id = "mensajeReenviado";
        mensajeReenviado.style.color = "#0a8a00";
        mensajeReenviado.style.fontSize = "0.9rem";
        mensajeReenviado.style.marginTop = "0.25rem";
        mensajeReenviado.textContent = "Código reenviado";
        reenviarTexto.appendChild(mensajeReenviado);
    }
    setTimeout(() => mensajeReenviado.remove(), 3000);
});

function validarPaso1() {
    let valido = true;

    // Expresiones regulares
    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    const soloNumeros = /^\d+$/;
    const correoValido = /^[^@]+@[^@]+\.(com)$/i;
    const contieneLetras = /[a-zA-Z]/;
    const contieneNumeros = /[0-9]/;
    const dptoValido = /^[A-Za-z0-9]+$/;

    // Campos requeridos
    const camposRequeridos = [
        "nombres",
        "apellidos",
        "dni",
        "dniNroTramite",
        "telefono",
        "correo",
        "direccion",
        "numero",
        "contrasenia",
    ];

    camposRequeridos.forEach((key) => {
        const campo = campos[key];
        const valor = campo.input.value.trim();

        if (!valor) {
            campo.error.textContent = "Este campo es obligatorio.";
            valido = false;
        } else {
            campo.error.textContent = ""; // Se limpia para poder aplicar validaciones específicas después
        }
    });

    // Validación de nombre
    const nombreVal = campos.nombres.input.value.trim();
    if (nombreVal && (nombreVal.length < 3 || !soloLetras.test(nombreVal))) {
        campos.nombres.error.textContent =
            "El nombre debe tener al menos 3 letras y solo contener letras.";
        valido = false;
    }

    // Validación de apellido
    const apellidoVal = campos.apellidos.input.value.trim();
    if (
        apellidoVal &&
        (apellidoVal.length < 3 || !soloLetras.test(apellidoVal))
    ) {
        campos.apellidos.error.textContent =
            "El apellido debe tener al menos 3 letras y solo contener letras.";
        valido = false;
    }

    // Validación de DNI
    const dniVal = campos.dni.input.value.trim();
    if (
        dniVal &&
        (!soloNumeros.test(dniVal) || dniVal.length < 7 || dniVal.length > 8)
    ) {
        campos.dni.error.textContent =
            "El DNI debe contener solo números y tener entre 7 y 8 dígitos.";
        valido = false;
    }

    // Validacion de Nro de Trámite DNI
    const dniNroTramiteVal = campos.dniNroTramite.input.value.trim();
    if (
        dniNroTramiteVal &&
        (!soloNumeros.test(dniNroTramiteVal) || dniNroTramiteVal.length !== 11)
    ) {
        campos.dniNroTramite.error.textContent =
            "El número de trámite debe contener solo números y tener exactamente 11 dígitos.";
        valido = false;
    }

    // Validación de teléfono
    const telVal = campos.telefono.input.value.trim();
    if (telVal && (!soloNumeros.test(telVal) || telVal.length !== 10)) {
        campos.telefono.error.textContent =
            "El teléfono debe contener solo números y tener exactamente 10 dígitos.";
        valido = false;
    }

    // Validación de dirección
    const direccionVal = campos.direccion.input.value.trim();
    if (direccionVal && direccionVal.length < 2) {
        campos.direccion.error.textContent =
            "La dirección debe contener al menos 2 caracteres.";
        valido = false;
    }

    // Validación número de dirección
    const numeroVal = campos.numero.input.value.trim();
    if (numeroVal && !soloNumeros.test(numeroVal)) {
        campos.numero.error.textContent =
            "El número de dirección debe contener solo números.";
        valido = false;
    }

    //  Validación opcional de piso
    const pisoVal = campos.piso.input.value.trim();
    if (pisoVal && (!soloLetras.test(pisoVal) || parseInt(pisoVal) <= 0)) {
        campos.piso.error.textContent =
            "El piso debe contener solo números positivos.";
        valido = false;
    } else {
        campos.piso.error.textContent = "";
    }

    // Validación opcional de departamento
    const dptoVal = campos.dpto.input.value.trim();
    if (dptoVal && !dptoValido.test(dptoVal)) {
        campos.dpto.error.textContent =
            "El departamento debe ser alfanumérico sin espacios.";
        valido = false;
    } else {
        campos.dpto.error.textContent = "";
    }

    // Validación de correo electrónico
    const emailVal = campos.correo.input.value.trim();
    if (emailVal && !correoValido.test(emailVal)) {
        campos.correo.error.textContent =
            "El correo debe ser válido y terminar en '.com'.";
        valido = false;
    }

    // Validación de contraseña
    const passVal = campos.contrasenia.input.value.trim();
    if (
        passVal &&
        (passVal.length < 8 ||
            !contieneLetras.test(passVal) ||
            !contieneNumeros.test(passVal))
    ) {
        campos.contrasenia.error.textContent =
            "La contraseña debe tener al menos 8 caracteres, letras y números.";
        valido = false;
    }

    return valido;
}

// Validaciones paso 2
function validarPaso2() {
    let valido = true;
    if (!campos.metodoVerificacion.input.value) {
        campos.metodoVerificacion.error.textContent = "Selecciona un método.";
        valido = false;
    }
    if (
        contenedorCodigo.style.display !== "none" &&
        !campos.codigo.input.value.trim()
    ) {
        campos.codigo.error.textContent = "Ingresa el código.";
        valido = false;
    }
    return valido;
}

// Validaciones paso 3
function validarPaso3() {
    let valido = true;

    ["dniFrente", "dniDorso", "selfieDni", "reciboSueldo"].forEach((key) => {
        const campo = campos[key];
        if (!campo.input.files || campo.input.files.length === 0) {
            campo.error.textContent = "Por favor, sube esta imagen.";
            valido = false;
        } else {
            const file = campo.input.files[0];
            if (!file.type.startsWith("image/")) {
                campo.error.textContent = "Debe ser una imagen.";
                campo.input.value = "";
                valido = false;
            } else {
                campo.error.textContent = "";
            }
        }
    });

    const cbuVal = campos.cbu.input.value.trim();
    if (!/^\d{22}$/.test(cbuVal)) {
        campos.cbu.error.textContent =
            "El CBU debe tener 22 dígitos numéricos.";
        valido = false;
    } else {
        campos.cbu.error.textContent = "";
    }
    return valido;
}

// Botones siguiente/verificar (solo pasos 1 y 2)
document.querySelectorAll(".siguiente, #step-2 .verificar").forEach((btn) =>
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        let validoPaso;
        if (currentStep === 0) validoPaso = validarPaso1();
        else if (currentStep === 1) validoPaso = validarPaso2();

        if (validoPaso && currentStep < steps.length - 1)
            showStep(currentStep + 1);
    })
);

// Botones anterior
document.querySelectorAll(".anterior").forEach((btn) =>
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        if (currentStep > 0) showStep(currentStep - 1);
    })
);

// Submit paso 3
steps[2].querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validarPaso3()) return;

    const modal = new bootstrap.Modal(
        document.getElementById("modalRegistroExitoso")
    );
    modal.show();
});

// Vista previa imágenes paso 3
["dniFrente", "dniDorso", "selfieDni", "reciboSueldo"].forEach((key) => {
    const campo = campos[key];
    campo.input.addEventListener("change", function () {
        const wrapper = this.closest(".upload-wrapper");
        const file = this.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            campo.error.textContent = "El archivo debe ser una imagen.";
            this.value = "";
            wrapper.style.backgroundImage = "none";
            wrapper.style.color = "var(--azul)";
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            wrapper.style.backgroundImage = `url(${e.target.result})`;
            wrapper.style.color = "transparent";
            campo.error.textContent = "";
        };
        reader.readAsDataURL(file);
    });
});

// Doble click para borrar imagen
setTimeout(() => {
    document.querySelectorAll(".upload-wrapper").forEach((wrapper) => {
        wrapper.addEventListener("dblclick", function () {
            this.style.backgroundImage = "none";
            this.style.color = "var(--azul)";
            const input = this.querySelector("input[type=file]");
            if (input) input.value = "";
        });
    });
}, 100);

const formularioPaso1 = document.querySelector("#formPaso1");
const formularioPaso3 = document.querySelector("#formPaso3");

if (formularioPaso3) {
    formularioPaso3.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = new FormData();

        // ✅ Agregar campos del paso 1
        const camposPaso1 = formularioPaso1.querySelectorAll(
            "input, select, textarea"
        );
        camposPaso1.forEach((campo) => {
            if (campo.name) {
                formData.append(campo.name, campo.value);
            }
        });

        // ✅ Agregar campos del paso 3 (archivos y cbu)
        const camposPaso3 = formularioPaso3.querySelectorAll(
            "input, select, textarea"
        );
        camposPaso3.forEach((campo) => {
            if (campo.type === "file") {
                if (campo.files.length > 0) {
                    formData.append(campo.name, campo.files[0]);
                }
            } else if (campo.name) {
                formData.append(campo.name, campo.value);
            }
        });

        // ✅ Debug
        console.log("Enviando:");
        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            const response = await fetch("http://localhost:3000/persona", {
                method: "POST",
                body: formData,
            });

            console.log(response);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error("Error al enviar el formulario: " + errorText);
            }

            const result = await response.json();
            console.log("usuario creado:", result);
            alert("Usuario creado correctamente");
        } catch (err) {
            console.error(err);
            alert("Error al crear el usuario");
        }
    });
} else {
    console.error("No se encontró el formulario del paso 3");
}
