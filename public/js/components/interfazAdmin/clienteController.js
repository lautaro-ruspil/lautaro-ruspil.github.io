import { getClientes, guardarClientes } from "./data.js";
import {
    mostrarSeccionClientes,
    cargarFormularioCliente,
    cargarFormularioPostulante,
} from "./ui.js";
import { cargarClientesEnSelect } from "./creditos.js";
import { validarFormulario } from "./validaciones.js";

const campos = [
    "nombres",
    "apellidos",
    "dni",
    "direccion",
    "numero",
    "piso",
    "dpto",
    "telefono",
    "correo",
    "contrasenia",
    "monto",
    "cuotasIniciales",
    "cuotasPagas",
    "estadoCuenta",
];

function obtenerCamposFormulario() {
    return campos.reduce(
        (acc, key) => ({
            ...acc,
            [key]: {
                input: document.getElementById(key),
                error: document.getElementById(`error-${key}`),
            },
        }),
        {}
    );
}

function obtenerValoresFormulario(camposForm) {
    return campos.reduce(
        (datos, key) => ({
            ...datos,
            [key]: camposForm[key]?.input?.value?.trim() ?? "",
        }),
        {}
    );
}

function asociarEventosInputs(camposForm) {
    for (const key in camposForm) {
        const campo = camposForm[key];
        campo?.input?.addEventListener(
            "input",
            () => (campo.error.textContent = "")
        );
    }
}

function generarNuevoId(clientes) {
    return clientes.length ? Math.max(...clientes.map((c) => +c.id)) + 1 : 1;
}

export async function procesarFormulario(e) {
    e.preventDefault();

    const camposForm = obtenerCamposFormulario();
    asociarEventosInputs(camposForm);

    if (!validarFormulario(camposForm)) return;

    const idRaw = document.getElementById("clienteId")?.value.trim();
    const id = idRaw && idRaw !== "0" ? +idRaw : null;

    const datos = obtenerValoresFormulario(camposForm);

    const clientePayload = {
        nombreCliente: datos.nombres,
        apellidoCliente: datos.apellidos,
        dniCliente: datos.dni,
        direccionCliente: datos.direccion,
        direccionNumeroCliente: +datos.numero,
        piso: datos.piso,
        dpto: datos.dpto,
        telefonoCliente: datos.telefono,
        correoCliente: datos.correo,
        contraseniaCliente: datos.contrasenia,
    };

    try {
        let respuesta;
        let clienteActualizado;

        if (id !== null && !isNaN(id)) {
            // PUT para actualizar
            respuesta = await fetch(`http://localhost:3000/cliente/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(clientePayload),
            });
            if (!respuesta.ok) throw new Error("Error al actualizar cliente");
            clienteActualizado = await respuesta.json();

            // Actualiza tu lista local con clienteActualizado
            let clientes = await getClientes();
            const idx = clientes.findIndex(
                (c) => c.idCliente === clienteActualizado.idCliente
            );
            if (idx !== -1) {
                clientes[idx] = clienteActualizado;
            } else {
                clientes.push(clienteActualizado);
            }

            guardarClientes(clientes);
        } else {
            // POST para crear nuevo cliente
            respuesta = await fetch("http://localhost:3000/cliente", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(clientePayload),
            });
            if (!respuesta.ok) throw new Error("Error al crear cliente");
            console.log(respuesta.statusText);
            clienteActualizado = await respuesta.json();

            // Recarga lista completa para mantener sincronía
            let clientes = await getClientes();
            clientes.push(clienteActualizado);
            guardarClientes(clientes);
        }

        cargarClientesEnSelect();
        mostrarSeccionClientes();
    } catch (err) {
        alert("Error: " + err.message);
    }
}

export async function verCliente(id) {
    try {
        const clientes = await getClientes(); // Obtener todos los clientes
        console.log("ID buscado:", id);
        console.log("Clientes:", clientes);

        const cliente = clientes.find((c) => +c.idCliente === id);
        if (!cliente) {
            alert("Cliente no encontrado");
            return;
        }

        // Cargar datos en el formulario
        cargarFormularioCliente(cliente);

        // Bloquear todos los campos para solo lectura
        const formulario = document.getElementById("clienteForm");
        if (formulario) {
            formulario
                .querySelectorAll("input, select, textarea")
                .forEach((elem) => {
                    elem.setAttribute("readonly", true); // Para inputs y textareas
                    elem.setAttribute("disabled", true); // Para selects y otros
                });
        }

        // Ocultar o deshabilitar el botón Guardar si existe
        const btnGuardar = document.getElementById("btnGuardarCliente");
        if (btnGuardar) {
            btnGuardar.style.display = "none";
            // o btnGuardar.disabled = true;
        }
    } catch (error) {
        console.error("Error al ver cliente:", error);
    }
}

export async function editarCliente(id) {
    const clientes = await getClientes(); // Espera el array
    console.log("ID buscado:", id);
    console.log("Clientes:", clientes);
    const cliente = clientes.find((c) => +c.idCliente === id);
    if (!cliente) return alert("Cliente no encontrado");
    cargarFormularioCliente(cliente);
}

export function eliminarCliente(id) {
    if (!confirm("¿Está seguro que desea eliminar este cliente?")) return;
    const clientes = getClientes().filter((c) => +c.id !== id);
    guardarClientes(clientes);
    cargarClientesEnSelect();
    mostrarSeccionClientes();
}
