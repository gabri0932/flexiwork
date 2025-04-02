document.addEventListener("DOMContentLoaded", function () {
    const cardNumberInput = document.getElementById("card-number");
    const cardNameInput = document.getElementById("card-name");
    const expiryInput = document.getElementById("expiry");
    const cvvInput = document.getElementById("cvv");
    const checkoutButton = document.getElementById("checkout-button");
    const errorMessage = document.querySelector(".mensaje_error");
  
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