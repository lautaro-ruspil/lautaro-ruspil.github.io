document.addEventListener("DOMContentLoaded", () => {
    // Usamos ruta absoluta basada en la raíz del sitio
    fetch("../../../public/partials/header.html")
        .then((res) => res.text())
        .then((data) => {
            document.getElementById("header-placeholder").innerHTML = data;
            activarLinkActual();
        });

    fetch("../../../public/partials/footer.html")
        .then((res) => res.text())
        .then((data) => {
            document.getElementById("footer-placeholder").innerHTML = data;
        });

    function activarLinkActual() {
        const filename = window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();
        const esInicio = filename === "" || filename === "index.html";

        requestAnimationFrame(() => {
            const links = document.querySelectorAll(".nav-link");
            links.forEach((link) => {
                const texto = link.textContent.trim().toLowerCase();
                const href = link.getAttribute("href") || "";
                if (
                    (esInicio && texto === "inicio") ||
                    href.toLowerCase().endsWith(filename)
                ) {
                    link.classList.add("active");
                    link.setAttribute("aria-current", "page");
                }
            });
        });
    }
});

document.addEventListener("keydown", (e) => {
    if (
        e.key === "F12" ||
        (e.ctrlKey &&
            (e.key === "I" ||
                e.key === "J" ||
                e.key === "C" ||
                e.key === "i" ||
                e.key === "j" ||
                e.key === "c")) ||
        (e.ctrlKey &&
            (e.key === "U" ||
                e.key === "S" ||
                e.key === "A" ||
                e.key === "u" ||
                e.key === "s" ||
                e.key === "a"))
    ) {
        e.preventDefault();
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Función no permitida.",
        });
    }
});

document.addEventListener("contextmenu", (e) => {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No está permitido hacer clic derecho",
    });
    e.preventDefault(); // evita que se abra el menú contextual
});
