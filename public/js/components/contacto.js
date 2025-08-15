document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formContacto");

    const campos = {
        nombre: {
            input: document.getElementById("nombre"),
            error: document.getElementById("error-nombre"),
            validate: (val) =>
                /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]{2,}$/.test(val) ||
                "Solo letras, mínimo 2 caracteres.",
        },
        correo: {
            input: document.getElementById("correo"),
            error: document.getElementById("error-correo"),
            validate: (val) =>
                (val.includes("@") && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) ||
                "Correo inválido. Debe incluir '@' y terminar en .com.",
        },
        asunto: {
            input: document.getElementById("asunto"),
            error: document.getElementById("error-asunto"),
            validate: (val) => {
                if (val.length === 0) return "El asunto no puede estar vacío.";
                if (val.length > 100)
                    return "El asunto no puede superar los 100 caracteres.";
                return true;
            },
        },
        mensaje: {
            input: document.getElementById("mensaje"),
            error: document.getElementById("error-mensaje"),
            validate: (val) => {
                if (val.length === 0) return "El mensaje no puede estar vacío.";
                if (val.length > 1000)
                    return "El mensaje no puede superar los 1000 caracteres.";
                return true;
            },
        },
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let valido = true;

        Object.values(campos).forEach(({ input, error, validate }) => {
            const valor = input.value.trim();
            const resultado = validate(valor);

            if (resultado !== true) {
                error.textContent = resultado;
                valido = false;
            } else {
                error.textContent = "";
            }
        });

        if (valido) {
            form.reset();
            Object.values(campos).forEach(
                ({ error }) => (error.textContent = "")
            );
            const modal = new bootstrap.Modal(
                document.getElementById("modalConfirmacion")
            );
            modal.show();
            // Escuchar cuando el modal se oculta para redirigir
            document
                .getElementById("modalConfirmacion")
                .addEventListener("hidden.bs.modal", () => {
                    window.location.href = "../Index.html";
                });
        }
    });

    Object.values(campos).forEach(({ input, error }) => {
        input.addEventListener("input", () => (error.textContent = ""));
    });
});
