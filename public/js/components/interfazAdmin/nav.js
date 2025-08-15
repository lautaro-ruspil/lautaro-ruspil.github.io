import { mostrarSeccion } from "./secciones.js";
import {
    mostrarSeccionClientes,
    mostrarSeccionPostulantes,
    renderizarTablaPostulantes,
} from "./ui.js";

// Configura el comportamiento de los enlaces de navegación
export function configurarNav() {
    const enlaces = document.querySelectorAll("nav a.nav-sistema");

    enlaces.forEach((enlace) => {
        enlace.addEventListener("click", (e) => {
            e.preventDefault();

            // Eliminar la clase activa de todos los enlaces
            enlaces.forEach((el) => el.classList.remove("active"));

            // Obtener el enlace clickeado
            const anchor = e.currentTarget;

            if (!anchor) return;

            anchor.classList.add("active");

            const target = anchor.dataset.target?.toLowerCase();
            if (!target) return;

            // Mostrar la sección correspondiente
            if (target === "clientes") {
                mostrarSeccionClientes();
            } else if (target === "postulantes") {
                mostrarSeccion(target);
                renderizarTablaPostulantes();
            } else {
                mostrarSeccion(target);
            }
        });
    });
}
