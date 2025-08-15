// ===== Importación de Módulos =====

// Navegación
import { configurarNav } from "./nav.js";

// Clientes
import { configurarFormularioCliente } from "./clientes.js";

// Créditos
import {
    cargarClientesEnSelect,
    configurarDetalleClienteCredito,
} from "./creditos.js";

// Pagos
import { inicializarPagos } from "./pagos.js";

// Reportes
import { inicializarReportes } from "./reportes.js";

// Simulador
import { inicializarSimulador } from "./simulador.js";

// Exportación de datos
import { inicializarExportaciones } from "./exportar.js";

import { obtenerClientesBaseDatos } from "./getClientes.js";
import { mostrarSeccionPostulantes } from "./ui.js";

// (Opcional) Almacenamiento local
// import { cargarDesdeLocalStorage } from "./data.js";

// ===== Inicialización General de la App =====

function inicializarApp() {
    // cargarDesdeLocalStorage(); // Cargar datos persistentes
    configurarNav(); // Menú de navegación
    configurarFormularioCliente(); // Formulario de clientes
    cargarClientesEnSelect(); // Menú desplegable de clientes
    configurarDetalleClienteCredito(); // Vista detalle del crédito
    inicializarPagos(); // Funcionalidad de pagos
    inicializarReportes(); // Sección de reportes
    inicializarSimulador(); // Simulador de créditos/cuotas
    inicializarExportaciones(); // Exportar datos
    mostrarSeccionPostulantes();
    obtenerClientesBaseDatos();
}

// ===== Arranque cuando el DOM está listo =====
document.addEventListener("DOMContentLoaded", inicializarApp);
