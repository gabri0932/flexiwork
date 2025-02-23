document.addEventListener("DOMContentLoaded", () => {
    const nombreTarjeta = document.getElementById("nombre_tarjeta");
    const numerosTarjeta = document.getElementById("numeros");
    const fechaVencimiento = document.getElementById("fecha_vencimiento");
    const pagar = document.getElementById("pagar");
    const div = document.getElementById("mensaje_error");

    // Creamos el mensaje de error solo una vez
    const mensajeError = document.createElement("p");
    mensajeError.style.color = "red";
    mensajeError.style.display = "none"; // Lo ocultamos inicialmente
    div.appendChild(mensajeError); // Lo agregamos al DOM

    if (pagar) {
        pagar.addEventListener("click", (event) => {
            

            let errores = [];

            // Validación del nombre
            if (nombreTarjeta.value.trim() === "") {
                errores.push("El campo nombre es obligatorio.");
            }

            // Validación del número de tarjeta
            const numeroTarjetaValue = numerosTarjeta.value.replace(/\s+/g, ""); // Elimina espacios
            if (!/^\d{13,19}$/.test(numeroTarjetaValue)) {
                errores.push("El número de tarjeta debe tener entre 13 y 19 dígitos.");
            }

            // Validación de la fecha de vencimiento
            const fechaIngresada = new Date(fechaVencimiento.value);
            const fechaActual = new Date();
            fechaActual.setDate(1); // Establecer el día en 1 para comparar solo mes y año
            if (fechaIngresada <= fechaActual || isNaN(fechaIngresada)) {
                errores.push("La fecha de vencimiento debe ser posterior al mes actual.");
            }

            // Mostrar errores o procesar pago
            if (errores.length > 0) {
                mensajeError.textContent = errores.join(" ");
                mensajeError.style.display = "block";
            } else {
                mensajeError.style.display = "none";
                console.log("Pago procesado correctamente.");
            }
        });
    } else {
        console.log("No se encuentra el botón de pagar");
    }
});


//../app.html