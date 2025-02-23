document.addEventListener("DOMContentLoaded", () => {
    const nombreTarjeta = document.getElementById("nombre_tarjeta");
    const numerosTarjeta = document.getElementById("numeros");
    const codigoSeguridad = document.getElementById("codigo_seguridad");
    const fechaVencimiento = document.getElementById("fecha_vencimiento");
    const pagar = document.getElementById("pagar");
    const div = document.getElementById("mensaje_error");

    const mensajeError = document.createElement("p");
    mensajeError.style.color = "red";
    mensajeError.style.display = "none";
    div.appendChild(mensajeError);

    pagar.addEventListener("click", (event) => {
        event.preventDefault();
        let errores = [];

        if (nombreTarjeta.value.trim() === "") {
            errores.push("El campo nombre es obligatorio.");
        }

        const numeroTarjetaValue = numerosTarjeta.value.replace(/\s+/g, "");
        if (!/^\d{13,19}$/.test(numeroTarjetaValue)) {
            errores.push("El número de tarjeta debe tener entre 13 y 19 dígitos.");
        }

        if (!/^\d{3,4}$/.test(codigoSeguridad.value)) {
            errores.push("El CVV debe tener 3 o 4 dígitos numéricos.");
        }

        const fechaIngresada = new Date(fechaVencimiento.value);
        const fechaActual = new Date();
        fechaActual.setDate(1);
        if (fechaIngresada <= fechaActual || isNaN(fechaIngresada)) {
            errores.push("La fecha de vencimiento debe ser posterior al mes actual.");
        }

        if (errores.length > 0) {
            mensajeError.textContent = errores.join(" ");
            mensajeError.style.display = "block";
        } else {
            mensajeError.style.display = "none";
            console.log("Pago procesado correctamente.");
        }
    });
});

//../app.html