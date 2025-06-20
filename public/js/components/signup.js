// Elementos
const steps = document.querySelectorAll(".step");
const circles = document.querySelectorAll(".step-circle");
let currentStep = 0;

// Mostrar paso por índice
function showStep(i) {
	steps.forEach((s, idx) => {
		s.classList.toggle("active", idx === i);
	});
	circles.forEach((c, idx) => {
		c.classList.toggle("active", idx === i);
	});
	currentStep = i;
}

// Inicial
showStep(currentStep);

// Siguiente (botones .siguiente y .verificar)
document.querySelectorAll(".siguiente, .verificar").forEach((btn) =>
	btn.addEventListener("click", (e) => {
		e.preventDefault();
		if (currentStep < steps.length - 1) showStep(currentStep + 1);
	})
);

// Anterior (primer botón dentro de .buttons)
document.querySelectorAll(".buttons button:first-child").forEach((btn) =>
	btn.addEventListener("click", (e) => {
		e.preventDefault();
		if (currentStep > 0) showStep(currentStep - 1);
	})
);
