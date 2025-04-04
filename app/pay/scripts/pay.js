document.addEventListener("DOMContentLoaded", function () {
  const cardNumberInput = document.getElementById("card-number");
  const cardNameInput = document.getElementById("card-name");
  const expiryInput = document.getElementById("expiry");
  const cvvInput = document.getElementById("cvv");
  const checkoutButton = document.getElementById("checkout-button");
  const errorMessage = document.querySelector(".mensaje_error");

  // Formato para número de tarjeta: grupos de 4 dígitos
  cardNumberInput.addEventListener("input", function(e) {
      // Eliminar cualquier cosa que no sea número
      let value = this.value.replace(/\D/g, "");
      
      // Limitar a 16 dígitos
      value = value.substring(0, 16);
      
      // Añadir espacios cada 4 dígitos
      let formattedValue = "";
      for (let i = 0; i < value.length; i++) {
          if (i > 0 && i % 4 === 0) {
              formattedValue += " ";
          }
          formattedValue += value[i];
      }
      
      // Actualizar el valor del campo
      this.value = formattedValue;
  });
  
  // Formato para fecha de expiración: MM/AA
  expiryInput.addEventListener("input", function(e) {
      // Eliminar cualquier cosa que no sea número
      let value = this.value.replace(/\D/g, "");
      
      // Limitar a 4 dígitos (2 para mes, 2 para año)
      value = value.substring(0, 4);
      
      // Añadir / después de los primeros 2 dígitos
      if (value.length > 2) {
          value = value.substring(0, 2) + "/" + value.substring(2);
      }
      
      // Actualizar el valor del campo
      this.value = value;
  });
  
  // Limitar CVV a 3 dígitos
  cvvInput.addEventListener("input", function(e) {
      // Eliminar cualquier cosa que no sea número
      let value = this.value.replace(/\D/g, "");
      
      // Limitar a 3 dígitos
      value = value.substring(0, 3);
      
      // Actualizar el valor del campo
      this.value = value;
  });

  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.color = "red";
  }

  function clearError() {
    errorMessage.textContent = "";
  }

  function isValidCardNumber(number) {
    return /^\d{16}$/.test(number.replace(/\s+/g, ""));
  }

  function isValidName(name) {
    return /^[a-zA-ZÁÉÍÓÚáéíóúÑñ ]+$/.test(name) && name.trim().length > 4;
  }

  function isValidExpiry(expiry) {
    return /^(0[1-9]|1[0-2])\/(\d{2})$/.test(expiry);
  }

  function isValidCVV(cvv) {
    return /^\d{3,4}$/.test(cvv);
  }

  checkoutButton.addEventListener("click", function (event) {
    event.preventDefault();
    clearError();

    const cardNumber = cardNumberInput.value;
    const cardName = cardNameInput.value;
    const expiry = expiryInput.value;
    const cvv = cvvInput.value;

    if (!isValidCardNumber(cardNumber)) {
      showError("Número de tarjeta inválido. Debe tener 16 dígitos.");
      return;
    }
    
    if (!isValidName(cardName)) {
      showError("Nombre inválido. Asegúrate de ingresar un nombre completo.");
      return;
    }
    
    if (!isValidExpiry(expiry)) {
      showError("Fecha de expiración inválida. Usa el formato MM/AA.");
      return;
    }
    
    if (!isValidCVV(cvv)) {
      showError("CVV inválido. Debe tener 3 o 4 dígitos.");
      return;
    }

    // Justo aquí tocaría hacer la request, aunque no sé si lo mejor sea en el success... hmmmmm

    const linkEl = document.getElementById('navigate');
    linkEl.setAttribute('href', '../success/index.html');
    linkEl.click();
  });
});
//../app.html

