import {
    editarCliente,
    eliminarCliente,
    verCliente,
} from "./clienteController.js";
import { getClientes, getPostulantes } from "./data.js";
import { eliminarPostulante, verPostulante } from "./postulanteController.js";

let perPage = 5;
let curPage = 1;

function ocultarTodasLasSecciones() {
    document
        .querySelectorAll(".seccionSistema")
        .forEach((s) => (s.style.display = "none"));
}

export function mostrarSeccionPostulantes() {
    ocultarTodasLasSecciones();
    document.getElementById("seccionPostulantes").style.display = "block";
    renderizarTablaPostulantes();
}

export function mostrarSeccionClientes() {
    ocultarTodasLasSecciones();
    document.getElementById("seccionClientes").style.display = "block";
    renderizarTablaConPaginacionClientes();
}

export function mostrarSeccionRegistro() {
    ocultarTodasLasSecciones();
    document.getElementById("seccionRegistro").style.display = "block";
    document.getElementById("volverRegistroBtn").style.display = "none";
    limpiarFormulario();
}

export function cargarFormularioCliente(cliente, soloLectura = false) {
    const primerCredito =
        cliente.creditos && cliente.creditos.length > 0
            ? cliente.creditos[0]
            : null;

    const mapeoCampos = {
        clienteId: cliente.idCliente,
        nombres: cliente.nombreCliente,
        apellidos: cliente.apellidoCliente,
        dni: cliente.dniCliente,
        direccion: cliente.direccionCliente,
        numero: cliente.direccionNumeroCliente,
        piso: cliente.piso,
        dpto: cliente.dpto,
        telefono: cliente.telefonoCliente,
        correo: cliente.correoCliente,
        contrasenia: cliente.contraseniaCliente,
        monto: primerCredito ? primerCredito.montoCredito : "",
        cuotasIniciales: primerCredito
            ? primerCredito.cantidadCuotasCredito
            : "",
        cuotasPagas: cliente.cuotasPagasCliente,
        foto_dni_frente: cliente.fotoDniFrente,
        foto_dni_dorso: cliente.fotoDniDorso,
        foto_dni_selfie: cliente.fotoDniSelfie,
        foto_recibo_sueldo: cliente.fotoReciboSueldo,
        estadoCuenta: primerCredito ? primerCredito.estadoCredito : "",
    };

    for (const key in mapeoCampos) {
        const input = document.getElementById(key);
        if (input) input.value = mapeoCampos[key] ?? "";
    }

    // Asignar imágenes
    const imagenes = {
        foto_dni_frente_img: cliente.fotoDniFrente,
        foto_dni_dorso_img: cliente.fotoDniDorso,
        foto_dni_selfie_img: cliente.fotoDniSelfie,
        foto_recibo_sueldo_img: cliente.fotoReciboSueldo,
    };

    for (const idImg in imagenes) {
        const imgElem = document.getElementById(idImg);
        if (imgElem) {
            if (imagenes[idImg]) {
                imgElem.src = imagenes[idImg];
                imgElem.style.display = "block";
            } else {
                imgElem.style.display = "none";
            }
        }
    }

    // Bloquear campos si es solo lectura
    const formulario = document.getElementById("clienteForm");
    if (formulario) {
        formulario
            .querySelectorAll("input, select, textarea")
            .forEach((elem) => {
                if (soloLectura) {
                    elem.setAttribute("readonly", true);
                    elem.setAttribute("disabled", true);
                } else {
                    elem.removeAttribute("readonly");
                    elem.removeAttribute("disabled");
                }
            });
    }

    // Ocultar botón si es solo lectura
    const btnGuardar = document.getElementById("btnGuardarCliente");
    if (btnGuardar) {
        btnGuardar.style.display = soloLectura ? "none" : "inline-block";
    }

    ocultarTodasLasSecciones();
    document.getElementById("seccionRegistro").style.display = "block";
}

export function cargarFormularioPostulante(cliente, soloLectura = false) {
    const primerCredito =
        cliente.creditos && cliente.creditos.length > 0
            ? cliente.creditos[0]
            : null;

    const mapeoCampos = {
        clienteId: cliente.idCliente,
        nombres: cliente.nombreCliente,
        apellidos: cliente.apellidoCliente,
        dni: cliente.dniCliente,
        direccion: cliente.direccionCliente,
        numero: cliente.direccionNumeroCliente,
        piso: cliente.piso,
        dpto: cliente.dpto,
        telefono: cliente.telefonoCliente,
        correo: cliente.correoCliente,
        monto: primerCredito ? primerCredito.montoCredito : "",
        cuotas_totales: primerCredito
            ? primerCredito.cantidadCuotasCredito
            : "",
        foto_dni_frente: cliente.fotoDniFrente,
        foto_dni_dorso: cliente.fotoDniDorso,
        foto_dni_selfie: cliente.fotoDniSelfie,
        foto_recibo_sueldo: cliente.fotoReciboSueldo,
        cbu: cliente.cbu,
        estadoCuenta: primerCredito ? primerCredito.estadoCredito : "",
    };

    for (const key in mapeoCampos) {
        const input = document.getElementById(key);
        if (input) input.value = mapeoCampos[key] ?? "";
    }

    // Asignar imágenes
    const imagenes = {
        foto_dni_frente_img: cliente.fotoDniFrente,
        foto_dni_dorso_img: cliente.fotoDniDorso,
        foto_dni_selfie_img: cliente.fotoDniSelfie,
        foto_recibo_sueldo_img: cliente.fotoReciboSueldo,
    };

    for (const idImg in imagenes) {
        const imgElem = document.getElementById(idImg);
        if (imgElem) {
            if (imagenes[idImg]) {
                imgElem.src = imagenes[idImg];
                imgElem.style.display = "block";
            } else {
                imgElem.style.display = "none";
            }
        }
    }

    // Bloquear campos si es solo lectura
    const formulario = document.getElementById("clienteForm");
    if (formulario) {
        formulario
            .querySelectorAll("input, select, textarea")
            .forEach((elem) => {
                if (soloLectura) {
                    elem.setAttribute("readonly", true);
                    elem.setAttribute("disabled", true);
                } else {
                    elem.removeAttribute("readonly");
                    elem.removeAttribute("disabled");
                }
            });
    }

    // Ocultar botón si es solo lectura
    const btnGuardar = document.getElementById("btnGuardarCliente");
    if (btnGuardar) {
        btnGuardar.style.display = soloLectura ? "none" : "inline-block";
    }

    ocultarTodasLasSecciones();
    document.getElementById("seccionRegistro").style.display = "block";
}

function limpiarFormulario() {
    const form = document.getElementById("clienteForm");
    if (form) form.reset();
    document.getElementById("clienteId").value = "";
}

// Render tabla clientes (3 botones)
export async function renderizarTablaConPaginacionClientes() {
    const clientes = await getClientes();
    const total = Math.max(Math.ceil(clientes.length / perPage), 1);
    curPage = Math.min(curPage, total);

    const inicio = (curPage - 1) * perPage;
    const visibles = clientes.slice(inicio, inicio + perPage);

    const htmlEscritorio = visibles.length
        ? visibles
              .map((cliente) => {
                  const credito =
                      cliente.creditos && cliente.creditos.length > 0
                          ? cliente.creditos[0]
                          : null;
                  const montoCredito = credito
                      ? `$${credito.montoCredito}`
                      : "No hay créditos";

                  const estadoCredito =
                      cliente.creditos && cliente.creditos.length > 0
                          ? cliente.creditos[0].estadoCredito
                          : "No hay créditos";
                  return `
            <tr data-id="${cliente.idCliente}">
              <td>${cliente.nombreCliente}</td>
              <td>${cliente.apellidoCliente}</td>
              <td>${cliente.dniCliente}</td>
              <td>${cliente.telefonoCliente}</td>
              <td>${cliente.correoCliente}</td>
              <td>${montoCredito}</td>
              <td>${estadoCredito}</td>
              <td>
                <button class="btn btn-sm btn-ver me-1">Ver</button>
                <button class="btn btn-sm btn-editar me-1">Editar</button>
                <button class="btn btn-sm btn-eliminar">Eliminar</button>
              </td>
            </tr>
          `;
              })
              .join("")
        : `<tr><td colspan="8" class="text-center">No hay clientes</td></tr>`;

    const htmlMobile = visibles.length
        ? visibles
              .map((cliente) => {
                  const credito =
                      cliente.creditos && cliente.creditos.length > 0
                          ? cliente.creditos[0]
                          : null;
                  const montoCredito = credito
                      ? `$${credito.montoCredito}`
                      : "No hay créditos";
                  const estadoCredito =
                      cliente.creditos && cliente.creditos.length > 0
                          ? cliente.creditos[0].estadoCredito
                          : "No hay créditos";
                  return `
            <div class="card mb-3 shadow-sm border-primary" data-id="${
                cliente.idCliente
            }">
              <div class="card-body">
                <div class="row">
                  ${[
                      ["Nombres", cliente.nombreCliente],
                      ["Apellidos", cliente.apellidoCliente],
                      ["DNI", cliente.dniCliente],
                      ["Teléfono", cliente.telefonoCliente],
                      ["Correo", cliente.correoCliente],
                      ["Monto crédito", montoCredito],
                      ["Estado", estadoCredito],
                  ]
                      .map(
                          ([k, v]) => `
                    <div class="col-6"><strong>${k}:</strong></div>
                    <div class="col-6 text-end">${v}</div>`
                      )
                      .join("")}
                  <div class="col-12 text-end mt-3">
                    <button class="btn btn-sm btn-ver me-2">Ver</button>
                    <button class="btn btn-sm btn-editar me-2">Editar</button>
                    <button class="btn btn-sm btn-eliminar">Eliminar</button>
                  </div>
                </div>
              </div>
            </div>
          `;
              })
              .join("")
        : `<p class="text-center">No hay clientes</p>`;

    document.getElementById("tablaContenedor").innerHTML = `
    <div class="d-none d-md-block">
      <table class="table table-striped table-bordered align-middle">
        <thead class="table-primary text-center">
          <tr>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>DNI</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Monto Crédito</th>
            <th>Estado</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>${htmlEscritorio}</tbody>
      </table>
    </div>
    <div class="d-md-none">${htmlMobile}</div>`;

    renderizarPaginacion(total);
    asociarEventosTablaCliente();
}

// Render tabla postulantes (2 botones, con Monto Crédito y Cuotas Totales)
export async function renderizarTablaPostulantes() {
    const postulantes = await getPostulantes();
    console.log(postulantes);
    const total = Math.max(Math.ceil(postulantes.length / perPage), 1);
    curPage = Math.min(curPage, total);

    const inicio = (curPage - 1) * perPage;
    const visibles = postulantes.slice(inicio, inicio + perPage);

    const htmlEscritorio = visibles.length
        ? visibles
              .map((postulante) => {
                  return `
            <tr data-id="${postulante.idCliente}">
              <td>${postulante.nombreCliente}</td>
              <td>${postulante.apellidoCliente}</td>
              <td>${postulante.dniCliente}</td>
              <td>${postulante.telefonoCliente}</td>
              <td>${postulante.correoCliente}</td>
              <td>$${postulante.montoCreditoPostulante || "0"}</td>
              <td>${postulante.cuotasCreditoPostulante || "-"}</td>
              <td>
                <button class="btn btn-sm btn-ver me-1">Ver</button>
                <button class="btn btn-sm btn-eliminar">Eliminar</button>
              </td>
            </tr>
          `;
              })
              .join("")
        : `<tr><td colspan="8" class="text-center">No hay postulantes</td></tr>`;

    const htmlMobile = visibles.length
        ? visibles
              .map((postulante) => {
                  return `
            <div class="card mb-3 shadow-sm border-primary" data-id="${
                postulante.idCliente
            }">
              <div class="card-body">
                <div class="row">
                  ${[
                      ["Nombres", postulante.nombreCliente],
                      ["Apellidos", postulante.apellidoCliente],
                      ["DNI", postulante.dniCliente],
                      ["Teléfono", postulante.telefonoCliente],
                      ["Correo", postulante.correoCliente],
                      [
                          "Monto crédito",
                          `$${postulante.montoSolicitadoCliente || "0"}`,
                      ],
                      [
                          "Cuotas Totales",
                          postulante.cuotasTotalesCliente || "-",
                      ],
                  ]
                      .map(
                          ([k, v]) => `
                    <div class="col-6"><strong>${k}:</strong></div>
                    <div class="col-6 text-end">${v}</div>`
                      )
                      .join("")}
                  <div class="col-12 text-end mt-3">
                    <button class="btn btn-sm btn-ver me-2">Ver</button>
                    <button class="btn btn-sm btn-eliminar">Eliminar</button>
                  </div>
                </div>
              </div>
            </div>
          `;
              })
              .join("")
        : `<p class="text-center">No hay postulantes</p>`;

    document.getElementById("tablaPostulantesContenedor").innerHTML = `
    <div class="d-none d-md-block">
      <table class="table table-striped table-bordered align-middle">
        <thead class="table-primary text-center">
          <tr>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>DNI</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Monto Crédito</th>
            <th>Cuotas Totales</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>${htmlEscritorio}</tbody>
      </table>
    </div>
    <div class="d-md-none">${htmlMobile}</div>`;

    renderizarPaginacion(total);
    asociarEventosTablaPostulantes();
}

function renderizarPaginacion(total) {
    const html = Array.from(
        { length: total },
        (_, i) => `
		<li class="page-item ${curPage === i + 1 ? "active" : ""}">
			<a href="#" class="page-link page-num" data-page="${i + 1}">${i + 1}</a>
		</li>`
    ).join("");

    document.getElementById("paginacion").innerHTML = `
		<ul class="pagination justify-content-center">${html}</ul>`;
}

function asociarEventosTablaCliente() {
    const contenedor = document.getElementById("tablaContenedor");

    contenedor.onclick = (e) => {
        const row = e.target.closest("[data-id]");
        if (!row) return;

        const id = +row.dataset.id;
        if (e.target.classList.contains("btn-ver")) {
            verCliente(id);
            // Aquí puedes abrir modal o redirigir a detalle
        } else if (e.target.classList.contains("btn-editar")) {
            editarCliente(id);
        } else if (e.target.classList.contains("btn-eliminar")) {
            eliminarCliente(id);
        }
    };

    document.getElementById("paginacion").onclick = (e) => {
        if (e.target.classList.contains("page-num")) {
            e.preventDefault();
            const nueva = +e.target.dataset.page;
            if (nueva !== curPage) {
                curPage = nueva;
                renderizarTablaConPaginacion();
            }
        }
    };
}

function asociarEventosTablaPostulantes() {
    const tabla = document.getElementById("tablaPostulantesContenedor");
    tabla.onclick = (e) => {
        const fila = e.target.closest("tr");
        if (!fila) return;
        const id = +fila.dataset.id;

        if (e.target.classList.contains("btn-ver")) {
            verPostulante(id);
        } else if (e.target.classList.contains("btn-eliminar")) {
            eliminarPostulante(id);
        }
    };
}
