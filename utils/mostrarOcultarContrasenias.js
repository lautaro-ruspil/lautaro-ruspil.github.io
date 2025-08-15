export function mostrarOcultarContrasenia() {
    // Toggle mostrar/ocultar contraseña
    const togglePassword = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("contrasenia");

    if (togglePassword && passwordInput)
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
}
