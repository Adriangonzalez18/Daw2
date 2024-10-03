// Función genérica de validación
function validarInput(input, pattern, errorMsg) {
  const regex = new RegExp(pattern);
  if (!regex.test(input.value)) {
    input.classList.add("error");
    input.placeholder = errorMsg;
    return false;
  } else {
    input.classList.remove("error");
    return true;
  }
}

// Función para convertir texto en mayúsculas
function convertirAMayusculas(input) {
  input.value = input.value.toUpperCase();
}

// Validaciones individuales
document.getElementById('nombre').addEventListener('blur', function() {
  convertirAMayusculas(this);
  validarInput(this, "^[A-ZÁÉÍÓÚÑ ]+$", "Solo letras en MAYÚSCULAS");
});

document.getElementById('apellido').addEventListener('blur', function() {
  convertirAMayusculas(this);
  validarInput(this, "^[A-ZÁÉÍÓÚÑ ]+$", "Solo letras en MAYÚSCULAS");
});

document.getElementById('direccion').addEventListener('blur', function() {
  convertirAMayusculas(this);
  validarInput(this, "^[A-Z0-9ÁÉÍÓÚÑ ]+$", "Dirección en MAYÚSCULAS");
});

document.getElementById('email').addEventListener('blur', function() {
  validarInput(this, "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", "Formato de email inválido");
});

document.getElementById('telefono').addEventListener('blur', function() {
  validarInput(this, "^\\d{9}$", "Exactamente 9 dígitos");
});

document.getElementById('edad').addEventListener('blur', function() {
  validarInput(this, "^(?:1[01][0-9]|[1-9]?[0-9]|120)$", "Edad entre 0 y 120");
});

document.getElementById('dni').addEventListener('blur', function() {
  validarInput(this, "^\\d{8}[A-Za-z]$", "8 números y 1 letra");
});

// Función para habilitar el botón de enviar si todo está correcto
function verificarFormulario() {
  const nombreValido = validarInput(document.getElementById('nombre'), "^[A-ZÁÉÍÓÚÑ ]+$", "Solo letras en MAYÚSCULAS");
  const apellidoValido = validarInput(document.getElementById('apellido'), "^[A-ZÁÉÍÓÚÑ ]+$", "Solo letras en MAYÚSCULAS");
  const direccionValida = validarInput(document.getElementById('direccion'), "^[A-Z0-9ÁÉÍÓÚÑ ]+$", "Dirección en MAYÚSCULAS");
  const emailValido = validarInput(document.getElementById('email'), "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", "Formato de email inválido");
  const telefonoValido = validarInput(document.getElementById('telefono'), "^\\d{9}$", "Exactamente 9 dígitos");
  const edadValida = validarInput(document.getElementById('edad'), "^(?:1[01][0-9]|[1-9]?[0-9]|120)$", "Edad entre 0 y 120");
  const dniValido = validarInput(document.getElementById('dni'), "^\\d{8}[A-Za-z]$", "8 números y 1 letra");

  // Habilitar el botón si todos los campos son válidos
  document.getElementById('enviarBtn').disabled = !(nombreValido && apellidoValido && direccionValida && emailValido && telefonoValido && edadValida && dniValido);
}

// Añadir eventos de blur para cada campo y verificar el formulario
document.querySelectorAll('input').forEach(input => {
  input.addEventListener('blur', verificarFormulario);
});

  