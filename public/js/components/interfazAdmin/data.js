// Función que obtiene la lista de clientes desde el almacenamiento local del navegador
export async function getClientes() {
    try {
        const res = await fetch("http://localhost:3000/cliente");
        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error("Error al obtener clientes del backend:", err);
        return [];
    }
}

export async function getPostulantes() {
    try {
        const res = await fetch("http://localhost:3000/postulante");
        if (!res.ok) throw new Error(`Error Http: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error("Error al obtener clientes del backend:", err);
        return [];
    }
}

// Función que guarda una lista de clientes en el almacenamiento local
export function guardarClientes(clientes) {
    localStorage.setItem("clientes", JSON.stringify(clientes)); // Convierte el array/objeto en texto JSON y lo guarda
}

// // Función que se encarga de cargar los datos desde el localStorage
// // y asegurarse de que cada cliente tenga un ID válido
// export function cargarDesdeLocalStorage() {
// 	const clientes = getClientes(); // Obtiene los clientes guardados
// 	let cambiado = false; // Flag que indica si se hicieron cambios

// 	// clientes.forEach((c) => {
// 	// 	// Recorre cada cliente
// 	// 	if (!c.id || isNaN(c.id)) {
// 	// 		// Si el cliente no tiene ID o el ID no es un número válido...
// 	// 		c.id = Date.now() + Math.floor(Math.random() * 10000); // Le asigna un ID único basado en la fecha y un número aleatorio
// 	// 		console.log(c.id);
// 	// 		cambiado = true; // Marca que hubo un cambio
// 	// 	}
// 	// });

// 	// if (cambiado) guardarClientes(clientes); // Si se modificó algún cliente, se vuelve a guardar la lista actualizada
// }
