import { getClientes, guardarClientes } from "./data.js";
import { cargarFormularioPostulante } from "./ui.js";

export async function verPostulante(id) {
    const postulantes = await getClientes();
    const postulante = postulantes.find((p) => p.idCliente === id);
    if (!postulante) return alert("Postulante no encontrado");
    cargarFormularioPostulante(postulante);
}

export async function eliminarPostulante(id) {
    if (!confirm("¿Está seguro que desea eliminar este postulante?")) return;
    let postulantes = await getClientes();
    postulantes = clientes.filter((p) => p.idCliente !== id);
    guardarClientes(postulantes);
    // Volver a renderizar tabla postulantes
}
