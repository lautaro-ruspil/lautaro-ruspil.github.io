// ====== GALERÍA: GENERACIÓN DINÁMICA DEL CARRUSEL ======
const figuritas = [
    {
        imagen: "../assets/coralAguasProfundas.jpg",
        titulo: "Coral de aguas profundas <em>Anthomastus sp.</em>",
        descripcion:
            "A unos 1.500 m de profundidad, los investigadores hallaron campos extensos del coral blando Anthomastus sp., adaptado a la poca luz del fondo oceánico.",
    },
    {
        imagen: "../assets/pepinoDeMar.jpg",
        titulo: "Pepino de mar abisal <em>Scotoplanes sp.</em>",
        descripcion:
            "Este invertebrado, apodado “sea pig”, representa una de las formas de vida más curiosas del ecosistema profundo atlántico argentino.",
    },
    {
        imagen: "../assets/calamarTranslucido.png",
        titulo: "Calamar translúcido <em>Cranchiidae.</em>",
        descripcion:
            "Durante la inmersión del ROV SuBastian se observó un calamar casi transparente adaptado a la oscuridad de la zona abisal.",
    },
    {
        imagen: "../assets/pulpo.jpg",
        titulo: "Pulpo “Dumbo” <em>Grimpoteuthis.</em>",
        descripcion:
            "Pulpo abisal con aletas que parecen “orejas”; fue observado incubando huevos en cavidades del fondo.",
    },
    {
        imagen: "../assets/calamarLargo.jpg",
        titulo: "Calamar “bigfin” <em>Magnapinna.</em>",
        descripcion:
            "Calamar de brazos extremadamente largos, registrado en varias inmersiones de la expedición.",
    },
    {
        imagen: "../assets/coralAguasFrias.jpg",
        titulo: "Coral de aguas frías <em>Octocorallia.</em>",
        descripcion:
            "Colonias en forma de abanico que sostienen biodiversidad de peces e invertebrados.",
    },
    {
        imagen: "../assets/esponjasMarinas.jpg",
        titulo: "Esponja carnívora <em>Poriferan.</em>",
        descripcion:
            "Esponjas que atrapan pequeños invertebrados en aguas profundas, adaptadas a baja disponibilidad de alimento.",
    },
    {
        imagen: "../assets/lirios.jpeg",
        titulo: "Lirios de mar <em>Crinoideos.</em>",
        descripcion:
            "Crinoideos que forman densas agrupaciones en paredes del cañón submarino.",
    },
];

// ====== Render dinámico ======
const indicatorsContainer = document.getElementById("carousel-indicators");
const innerContentContainer = document.getElementById("carousel-inner-content");

figuritas.forEach((figurita, index) => {
    const isActive = index === 0 ? " active" : "";
    const targetId = "#carouselFiguritas";

    // Indicadores
    const indicatorButton = document.createElement("button");
    indicatorButton.type = "button";
    indicatorButton.setAttribute("data-bs-target", targetId);
    indicatorButton.setAttribute("data-bs-slide-to", index);
    indicatorButton.setAttribute("aria-label", `Slide ${index + 1}`);
    if (index === 0) {
        indicatorButton.classList.add("active");
        indicatorButton.setAttribute("aria-current", "true");
    }
    indicatorsContainer.appendChild(indicatorButton);

    // Ítem del carrusel
    const carouselItem = document.createElement("div");
    carouselItem.className = `carousel-item${isActive}`;
    carouselItem.innerHTML = `
        <img src="${figurita.imagen}" class="d-block w-100" alt="${figurita.titulo}">
        <div class='carousel-caption'>
            <h5>${figurita.titulo}</h5>
            <p>${figurita.descripcion}</p>
        </div>
    `;
    innerContentContainer.appendChild(carouselItem);
});
