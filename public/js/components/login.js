document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form"); //Buscar la ruta correcta (ya la encontre)

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const usuarioIngresado = document.getElementById("correo").value.trim();
      const passwordIngresada = document.getElementById("password").value.trim();

      const clientes = JSON.parse(localStorage.getItem("clientes")) || [];

      const cliente = clientes.find(
        c => c.correo === usuarioIngresado && c.contrasena === passwordIngresada
      );

      if (cliente) {
        // Guardamos los datos del cliente logueado en sessionStorage
        sessionStorage.setItem("clienteLogueado", JSON.stringify(cliente));
        window.location.href = "./interfazCliente.html";
      } else {
        alert("Usuario o contraseña incorrectos.");
      }
    });
  });