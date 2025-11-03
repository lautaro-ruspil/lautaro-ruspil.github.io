let figuritas = [
    {
        imagen: "../assets/coralAguasProfundas.jpg",
        titulo: "Coral de aguas profundas <em>Anthomastus sp.</em>",
        descripcion:
            "A unos 1.500 m de profundidad en el cañón submarino, los investigadores hallaron campos extensos del coral blando Anthomastus sp., en forma de 'hongo rojo' adaptado a la poca luz del fondo oceánico.",
    },
    {
        imagen: "../assets/pepinoDeMar.jpg",
        titulo: "Pepino de mar abisal <em>Scotoplanes sp.</em>",
        descripcion:
            "Este invertebrado, apodado “sea pig” en inglés, fue capturado en el fondo del cañón y representa una de las formas de vida más curiosas del ecosistema profundo atlántico argentino.",
    },
    {
        imagen: "../assets/calamarTranslucido.png",
        titulo: "Calamar translúcido <em>Cranchiidae.</em>",
        descripcion:
            "Durante la inmersión del ROV SuBastian se observó un calamar de cuerpo casi transparente adaptado a la oscuridad de la zona abisal, una de las muchas nuevas especies que la expedición identificó en el Atlántico Sur.",
    },
    {
        imagen: "../assets/pulpo.jpg",
        titulo: "Pulpo “Dumbo” <em>Grimpoteuthis.</em>",
        descripcion:
            "Pulpo abisal con aletas aproximadas que parecen “orejas”; reportado incubando huevos en cavidades observadas por el ROV.",
    },
    {
        imagen: "../assets/calamarLargo.jpg",
        titulo: "Calamar “bigfin” <em>Magnapinna.</em>",
        descripcion:
            "Calamar de brazos extremadamente largos (big-fin) — avistamientos parciales y tomas cercanas en varias inmersiones.",
    },
    {
        imagen: "../assets/coralAguasFrias.jpg",
        titulo: "Coral de aguas frías <em>Octocorallia.</em>",
        descripcion:
            "Colonias incrustantes o en forma de abanico que sostienen biodiversidad de peces e invertebrados.",
    },
    {
        imagen: "../assets/esponjasMarinas.jpg",
        titulo: "Esponja carnívora <em>Poriferan.</em>",
        descripcion:
            "Esponjas que atrapan pequeños invertebrados en aguas profundas; su presencia sugiere hábitats con baja disponibilidad de alimento particulado.",
    },
    {
        imagen: "../assets/lirios.jpeg",
        titulo: "Lirios de mar <em>Crinoideos.</em>",
        descripcion:
            "Crinoideos fijos o semimóviles, que forman densas agrupaciones en paredes del cañón.",
    },
];

// 1. Obtener los contenedores del carrusel por su ID
const indicatorsContainer = document.getElementById("carousel-indicators");
const innerContentContainer = document.getElementById("carousel-inner-content");

figuritas.forEach((figurita, index) => {
    // 2. Determinar si es el primer elemento para agregar la clase 'active'
    const isActive = index === 0 ? " active" : "";
    const targetId = "#carouselFiguritas"; // El ID de nuestro carrusel principal

    // A. Crear el Botón Indicador
    const indicatorButton = document.createElement("button");
    indicatorButton.setAttribute("type", "button");
    indicatorButton.setAttribute("data-bs-target", targetId);
    indicatorButton.setAttribute("data-bs-slide-to", index);
    indicatorButton.setAttribute("aria-label", `Slide ${index + 1}`);

    if (isActive) {
        indicatorButton.classList.add("active");
        indicatorButton.setAttribute("aria-current", "true");
    }

    indicatorsContainer.appendChild(indicatorButton);

    // B. Crear el Ítem del Carrusel
    const carouselItem = document.createElement("div");
    // Añadimos la clase 'carousel-item' y la clase 'active' si es el primer elemento
    carouselItem.classList.add(
        "carousel-item",
        ...isActive.split(" ").filter((c) => c)
    ); // Agrega 'active' si aplica

    // Usamos 'd-block w-100' en la imagen para que Bootstrap la escale correctamente
    // También usamos 'carousel-caption' para el título y la descripción
    carouselItem.innerHTML = `
        <img src='${figurita.imagen}' class='d-block w-100' alt='${figurita.titulo}'>
        <div class='carousel-caption d-none d-md-block'>
            <h5>${figurita.titulo}</h5>
            <p>${figurita.descripcion}</p>
        </div>
    `;

    innerContentContainer.appendChild(carouselItem);
});
