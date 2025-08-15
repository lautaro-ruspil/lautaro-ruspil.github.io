export async function obtenerClientesBaseDatos() {
    try {
        const res = await fetch("http://localhost:3000/cliente");
        console.log("respuesta cruda", res);

        if (!res.ok) {
            throw new Error(`Error Http: ${res.status}`);
        }

        const clientes = res.json();
        console.log(clientes);
    } catch (err) {
        console.error("Error en fetch:", err);
    }
}
