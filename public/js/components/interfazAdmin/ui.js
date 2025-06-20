// js/ui.js
import { getClientes } from "./data.js";

let clientesPorPagina = 5; // Cantidad de clientes a mostrar por página
let paginaActual = 1; // Página actual en la paginación

// Limpia el formulario y resetea el campo oculto clienteID
export function limpiarFormulario() {
	document.getElementById("clienteForm").reset();
	document.getElementById("clienteId").value = "";
}

// Muestra la sección de la tabla de clientes y oculta el formulario
export function mostrarSeccionClientes() {
	document.getElementById("seccionRegistro").style.display = "none";
	document.getElementById("seccionClientes").style.display = "block";
	renderizarTablaConPaginacion();
}

// Muestra la sección del formulario de registro y oculta la tabla
export function mostrarSeccionRegistro() {
	document.getElementById("seccionRegistro").style.display = "block";
	document.getElementById("seccionClientes").style.display = "none";
}

// Llena el formulario con los datos de un cliente para editarlo
export function cargarFormulario(cliente) {
	document.getElementById("clienteId").value = cliente.id;
	document.getElementById("nombres").value = cliente.nombres;
	document.getElementById("apellidos").value = cliente.apellidos;
	document.getElementById("dni").value = cliente.dni;
	document.getElementById("direccion").value = cliente.direccion;
	document.getElementById("numero").value = cliente.numero;
	document.getElementById("piso").value = cliente.piso;
	document.getElementById("dto").value = cliente.dto;
	document.getElementById("telefono").value = cliente.telefono;
	document.getElementById("correo").value = cliente.correo;
	document.getElementById("usuario").value = cliente.usuario;
    document.getElementById("contrasena").value = cliente.contrasena;
	document.getElementById("monto").value = cliente.monto;
	document.getElementById("cuotasIniciales").value = cliente.cuotasIniciales;
	document.getElementById("cuotasPagas").value = cliente.cuotasPagas;
	document.getElementById("estadoCuenta").value = cliente.estadoCuenta;

	mostrarSeccionRegistro();
}

// Renderiza la tabla con los clientes de la página actual
export function renderizarTablaConPaginacion() {
	const clientes = getClientes();
	const inicio = (paginaActual - 1) * clientesPorPagina;
	const fin = inicio + clientesPorPagina;
	const clientesPagina = clientes.slice(inicio, fin);

	// Construye el HTML de la tabla con los clientes paginados
	const tablaHTML = `
    <table>
      <thead>
        <tr>
          <th>ID</th>
		  <th>Nombres</th>
		  <th>Apellidos</th>
		  <th>DNI</th>
		  <th>Dirección</th>
		  <th>Número</th>
		  <th>Piso</th>
		  <th>Dto</th>
		  <th>Teléfono</th> 
		  <th>Correo</th>
		  <th>Usuario</th>
		  <th>Contraseña</th>
          <th>Monto</th>
		  <th>Cuotas Iniciales</th>
		  <th>Cuotas Pagas</th>
		  <th>Cuotas Pendientes</th>
		  <th>Estado</th>
		  <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        ${clientesPagina
			.map(
				(cliente) => `
          <tr>
            <td>${cliente.id}</td>
            <td>${cliente.nombres}</td>
            <td>${cliente.apellidos}</td>
            <td>${cliente.dni}</td>
            <td>${cliente.direccion}</td>			
			<td>${cliente.numero}</td>
			<td>${cliente.piso}</td>
			<td>${cliente.dto}</td>
            <td>${cliente.telefono}</td>
			<td>${cliente.correo}</td>
			<td>${cliente.usuario}</td>
            <td>${cliente.contrasena}</td>
            <td>${cliente.monto.toFixed(2)}</td>
            <td>${cliente.cuotasIniciales}</td>
            <td>${cliente.cuotasPagas}</td>
            <td>${cliente.cuotasPendientes}</td>
            <td>${cliente.estadoCuenta}</td>
            <td>
              <button onclick="window.editarCliente(${
					cliente.id
				})">Editar</button>
              <button onclick="window.eliminarCliente(${
					cliente.id
				})">Eliminar</button>
            </td>
          </tr>
        `
			)
			.join("")}
      </tbody>
    </table>
  `;

	document.getElementById("tablaContenedor").innerHTML = tablaHTML;
	renderizarPaginacion(clientes.length);
}

// Renderiza los botones de paginación según el total de clientes
function renderizarPaginacion(total) {
	const totalPaginas = Math.ceil(total / clientesPorPagina);
	let html = "";

	for (let i = 1; i <= totalPaginas; i++) {
		html += `<button onclick="window.cambiarPagina(${i})" ${
			i === paginaActual ? "style='font-weight:bold'" : ""
		}>${i}</button> `;
	}

	document.getElementById("paginacion").innerHTML = html;
}

// Cambia la página actual y vuelve a renderizar la tabla
export function cambiarPagina(pagina) {
	paginaActual = pagina;
	renderizarTablaConPaginacion();
}
