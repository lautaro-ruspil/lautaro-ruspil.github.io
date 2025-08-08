let clientes = [];
let idCounter = 1;

document.addEventListener("DOMContentLoaded", () => { 
  cargarDesdeLocalStorage(); //restaura el estado anterior de la aplicación
  renderizarTabla(); //renderiza la tabla con los clientes
});

function validarFormulario() { 
  const nombres = document.getElementById("nombres").value.trim();
  const apellidos = document.getElementById("apellidos").value.trim();
  const dni = document.getElementById("dni").value.trim();
  const direccion = document.getElementById("direccion").value.trim();
  const telefono = document.getElementById("telefono").value.trim();

  const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/; 
  const soloNumeros = /^\d+$/;

  if (nombres.length < 3 || !soloLetras.test(nombres)) {
    alert("El nombre debe tener al menos 3 letras y solo contener caracteres alfabéticos.");
    return false;
  }
  if (apellidos.length < 3 || !soloLetras.test(apellidos)) {
    alert("El apellido debe tener al menos 3 letras y solo contener caracteres alfabéticos.");
    return false;
  }
  if (!soloNumeros.test(dni) || dni.length < 7 || dni.length > 8) {
    alert("El DNI debe contener solo números y tener entre 7 y 8 dígitos.");
    return false;
  }
  if (direccion.length < 2) {
    alert("La dirección debe contener al menos 2 caracteres.");
    return false;
  }
  if (!soloNumeros.test(telefono) || telefono.length !== 10) {
    alert("El teléfono debe contener solo números y tener exactamente 10 dígitos.");
    return false;
  }
  return true;
}


/*document.getElementById("clienteForm").addEventListener("submit", function (e) { //función que envia el formulario
  e.preventDefault(); //evita que se envie el formulario*/

  document.getElementById("clienteForm").addEventListener("submit", function (e) {
  e.preventDefault();
  if (!validarFormulario()) {
    return; // Detener si hay errores
  }

  const idExistente = document.getElementById("clienteId").value; //obtiene el id del cliente si existe
  const cliente = { //crea un objeto con los datos del cliente
    id: idExistente || idCounter++, //si existe el id del cliente, usa el mismo, si no, usa el idCounter
    // obtiene los datos del cliente del formulario de aca para abajo
    nombres: document.getElementById("nombres").value, 
    apellidos: document.getElementById("apellidos").value,  
    dni: document.getElementById("dni").value, 
    direccion: document.getElementById("direccion").value, 
    telefono: document.getElementById("telefono").value,
    estadoCuenta: document.getElementById("estadoCuenta").value, 
    monto: parseFloat(document.getElementById("monto").value),
    cuotasIniciales: parseInt(document.getElementById("cuotasIniciales").value),
    cuotasPagas: parseInt(document.getElementById("cuotasPagas").value)
  };

  cliente.cuotasPendientes = cliente.cuotasIniciales - cliente.cuotasPagas; //calcula cuotas pendientes

  if (idExistente) {
    clientes = clientes.map(c => c.id == cliente.id ? cliente : c); //actualiza el cliente en la lista
  } else {
    clientes.push(cliente); //si no existe, añade el cliente a la lista
  }

  guardarEnLocalStorage(); //guarda el estado actual de la aplicación
  renderizarTabla(); //renderiza la tabla con los clientes
  limpiarFormulario(); //limpia el formulario
});

function renderizarTabla() { //función que renderiza la tabla con los clientes
  const tbody = document.getElementById("tablaClientes"); //obtiene el elemento tbody
  tbody.innerHTML = ""; //limpia el contenido del tbody

  clientes.forEach(cliente => { //itera sobre cada cliente
    const row = document.createElement("tr"); //crea un elemento tr
    //crea el html de la fila
    row.innerHTML = ` 
      <td>${cliente.id}</td> 
      <td>${cliente.nombres}</td>
      <td>${cliente.apellidos}</td>
      <td>${cliente.dni}</td>
      <td>${cliente.direccion}</td>
      <td>${cliente.telefono}</td>
      <td>${cliente.monto.toFixed(2)}</td>
      <td>${cliente.cuotasIniciales}</td>
      <td>${cliente.cuotasPagas}</td>
      <td>${cliente.cuotasPendientes}</td>
      <td>${cliente.estadoCuenta}</td>
      <td>
        <button onclick="editarCliente(${cliente.id})">Editar</button> 
        <button onclick="eliminarCliente(${cliente.id})">Eliminar</button>
      </td>
    `;
    tbody.appendChild(row); //agrega la fila al tbody
  });
}
 
function editarCliente(id) { //función que edita un cliente
  const cliente = clientes.find(c => c.id == id); //busca el cliente con el id
   //actualiza los datos del cliente en el formulario
  document.getElementById("clienteId").value = cliente.id; 
  document.getElementById("nombres").value = cliente.nombres;
  document.getElementById("apellidos").value = cliente.apellidos;
  document.getElementById("dni").value = cliente.dni;
  document.getElementById("direccion").value = cliente.direccion;
  document.getElementById("telefono").value = cliente.telefono;
  document.getElementById("monto").value = cliente.monto;
  document.getElementById("cuotasIniciales").value = cliente.cuotasIniciales;
  document.getElementById("cuotasPagas").value = cliente.cuotasPagas;
  document.getElementById("estadoCuenta").value = cliente.estadoCuenta;

//redirecciona al registro
document.getElementById("seccionRegistro").style.display = "block";
document.getElementById("seccionClientes").style.display = "none";

}

function eliminarCliente(id) { //función que elimina un cliente
  if (confirm("¿Desea eliminar este cliente?")) {
    clientes = clientes.filter(c => c.id != id); //elimina el cliente del array
    guardarEnLocalStorage(); //guarda el estado actual de la aplicación
    renderizarTabla(); //renderiza la tabla con los clientes
  }
}

function limpiarFormulario() { //función que limpia el formulario
  document.getElementById("clienteForm").reset(); //limpia el formulario
  document.getElementById("clienteId").value = ""; //limpia el campo id
}

function guardarEnLocalStorage() { //función que guarda el estado actual de la aplicación
  localStorage.setItem("clientes", JSON.stringify(clientes)); //guarda el array de clientes en localStorage
  localStorage.setItem("idCounter", idCounter.toString()); //guarda el contador de id en localStorage
}

function cargarDesdeLocalStorage() {  //función que carga el estado anterior de la aplicación
  const data = localStorage.getItem("clientes"); //obtiene el array de clientes
  const contador = localStorage.getItem("idCounter"); //obtiene el contador de id

  if (data) { 
    clientes = JSON.parse(data); //parsea el array de clientes
  }
  if (contador) {
    idCounter = parseInt(contador); //parsea el contador de id
  }
}
let clientesPorPagina = 5;
let paginaActual = 1;

function mostrarSeccionClientes() {
  document.getElementById("seccionRegistro").style.display = "none";
  document.getElementById("seccionClientes").style.display = "block";
  renderizarTablaConPaginacion();
}

function mostrarSeccionRegistro() {
  document.getElementById("seccionRegistro").style.display = "block";
  document.getElementById("seccionClientes").style.display = "none";
}

document.getElementById("verClientesBtn").addEventListener("click", mostrarSeccionClientes);
document.getElementById("volverRegistroBtn").addEventListener("click", mostrarSeccionRegistro);

function renderizarTablaConPaginacion() {
  const inicio = (paginaActual - 1) * clientesPorPagina;
  const fin = inicio + clientesPorPagina;
  const clientesPagina = clientes.slice(inicio, fin);

  const tablaHTML = `
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>DNI</th>
          <th>Dirección</th>
          <th>Teléfono</th>
          <th>Monto</th>
          <th>Cuotas Iniciales</th>
          <th>Cuotas Pagas</th>
          <th>Cuotas Pendientes</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        ${clientesPagina.map(cliente => `
          <tr>
            <td>${cliente.id}</td>
            <td>${cliente.nombres}</td>
            <td>${cliente.apellidos}</td>
            <td>${cliente.dni}</td>
            <td>${cliente.direccion}</td>
            <td>${cliente.telefono}</td>
            <td>${cliente.monto.toFixed(2)}</td>
            <td>${cliente.cuotasIniciales}</td>
            <td>${cliente.cuotasPagas}</td>
            <td>${cliente.cuotasPendientes}</td>
            <td>${cliente.estadoCuenta}</td>
            <td>
              <button onclick="editarCliente(${cliente.id})">Editar</button>
              <button onclick="eliminarCliente(${cliente.id})">Eliminar</button>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;

  document.getElementById("tablaContenedor").innerHTML = tablaHTML;
  renderizarPaginacion();
}

function renderizarPaginacion() {
  const totalPaginas = Math.ceil(clientes.length / clientesPorPagina); //
  let html = "";

  for (let i = 1; i <= totalPaginas; i++) {
    html += `<button onclick="cambiarPagina(${i})" ${i === paginaActual ? "style='font-weight:bold'" : ""}>${i}</button> `;
  }

  document.getElementById("paginacion").innerHTML = html;
}

function cambiarPagina(pagina) {
  paginaActual = pagina;
  renderizarTablaConPaginacion();
}
