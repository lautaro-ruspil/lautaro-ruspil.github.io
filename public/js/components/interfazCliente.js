

    
    document.addEventListener("DOMContentLoaded", () => {
      const datos = JSON.parse(sessionStorage.getItem("clienteLogueado"));
      const contenedor = document.getElementById("datosCliente");

      if (!datos) {
        contenedor.innerHTML = "<p class='text-danger'>No hay cliente autenticado.</p>";
        return;
      }

      contenedor.innerHTML = `
        <p><strong>Nombre:</strong> ${datos.nombres} ${datos.apellidos}</p>
        <p><strong>DNI:</strong> ${datos.dni}</p>
        <p><strong>Teléfono:</strong> ${datos.telefono}</p>
        <p><strong>Dirección:</strong> ${datos.direccion}</p>
        <p><strong>Número:</strong> ${datos.numero}</p>
        <p><strong>Piso:</strong> ${datos.piso}</p>
        <p><strong>Dto:</strong> ${datos.dto}</p>
        <p><strong>Correo:</strong> ${datos.correo}</p>
        <p><strong>Usuario:</strong> ${datos.usuario}</p>
        <p><strong>Contraseña:</strong> ${datos.contrasena}</p>
        <hr/>
        <p><strong>Monto Solicitado:</strong> $${datos.monto.toFixed(2)}</p>
        <p><strong>Cuotas Iniciales:</strong> ${datos.cuotasIniciales}</p>
        <p><strong>Cuotas Pagas:</strong> ${datos.cuotasPagas}</p>
        <p><strong>Cuotas Pendientes:</strong> ${datos.cuotasPendientes}</p>
        <p><strong>Estado de Cuenta:</strong> ${datos.estadoCuenta}</p>
      `;
    });

