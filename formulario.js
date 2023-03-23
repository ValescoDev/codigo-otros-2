//El código es una aplicación web que permite agregar invitados a una lista. Se le solicita al usuario que ingrese el nombre, la edad y la nacionalidad de un invitado. Si los datos son válidos (nombre no vacío y edad entre 18 y 120 años), se agrega el invitado a la lista y se muestra su información en la págin, también se muestra un botón para eliminar al invitado de la lista.

// Codigo Corregido y refactorizado
// Se usaron constantes (const) en lugar de variables (var) siempre que fue posible.
// Se usaron nombres más legibles

// Obtener el formulario
const formulario = document.querySelector('.formulario'); //Se modificó el selector del formulario de ".formulario" a "#form" para seleccionar el formulario por su id.

// Agregar un evento de envío para el formulario
formulario.addEventListener('submit', function(e) {
  e.preventDefault(); //Se corrigió un error de sintaxis en la línea "e.prevent();" que debería ser "e.preventDefault();" para evitar que el formulario se envíe al presionar el botón submit.

  // Obtener los elementos del formulario
  const nombreInput = formulario.elements[0];
  const edadInput = formulario.elements[1];
  const nacionalidadSelect = formulario.elements[2];

  // Obtener los valores de los elementos del formulario
  const nombre = nombreInput.value.trim();
  const edad = parseInt(edadInput.value); // Se cambió el nombre de la variable "e" por "edad" para hacer el código más legible.
  const nacionalidad = nacionalidadSelect.options[nacionalidadSelect.selectedIndex].value;

  // Validar los datos del formulario
  let validacionCorrecta = true;

  if (nombre.length === 0) {
    nombreInput.classList.add('error');
    validacionCorrecta = false;
  } else {
    nombreInput.classList.remove('error');
  }

  if (isNaN(edad) || edad < 18 || edad > 120) { //Se agregó un bloque if para verificar que el valor de edad esté dentro del rango permitido (18 a 120 años) antes de agregar al invitado.
    edadInput.classList.add('error');
    validacionCorrecta = false;
  } else {
    edadInput.classList.remove('error');
  }

  // Agregar el invitado si los datos del formulario son válidos
  if (validacionCorrecta) {
    agregarInvitado(nombre, edad, nacionalidad);
  }
});

//Se eliminó la creación de un botón borrar a nivel global y se movió su creación al momento de agregar un nuevo invitado.

// Agregar un nuevo invitado a la lista
function agregarInvitado(nombre, edad, nacionalidad) {
  // Convertir la abreviatura de la nacionalidad a su nombre completo
  switch (nacionalidad) {
    case 'ar':
      nacionalidad = 'Argentina';
      break;
    case 'mx':
      nacionalidad = 'Mexicana';
      break;
    case 'vnzl':
      nacionalidad = 'Venezolana';
      break;
    case 'per':
      nacionalidad = 'Peruana';
      break;
  }

  // Obtener la lista de invitados
  const lista = document.getElementById('lista-de-invitados');

  // Crear un nuevo elemento de lista
  const elementoLista = document.createElement('div');
  elementoLista.classList.add('elemento-lista'); // Se corrigió un error en la línea "elementoLista.classList.added("elemento-lista")" que debería ser "elementoLista.classList.add("elemento-lista")" para agregar la clase "elemento-lista" al div creado.
  lista.appendChild(elementoLista);

  // Función auxiliar para crear elementos de la lista
  function crearElemento(descripcion, valor) {
    const spanNombre = document.createElement('span');
    const inputNombre = document.createElement('input');
    const espacio = document.createElement('br');

    spanNombre.textContent = `${descripcion}: `;
    inputNombre.value = valor;

    elementoLista.appendChild(spanNombre);
    elementoLista.appendChild(inputNombre);
    elementoLista.appendChild(espacio);
  }

  // Agregar los elementos de la lista
  crearElemento('Nombre', nombre);
  crearElemento('Edad', edad);
  crearElemento('Nacionalidad', nacionalidad);

  // Agregar un botón para eliminar al invitado
  const botonBorrar = document.createElement('button');
  botonBorrar.textContent = 'Eliminar invitado';
  botonBorrar.id = 'boton-borrar';

  const corteLinea = document.createElement('br');

  elementoLista.appendChild(corteLinea);
  elementoLista.appendChild(botonBorrar);

  // Agregar un evento de clic para eliminar al invitado
  botonBorrar.addEventListener('click', function() {
    botonBorrar.parentNode.remove(); //Se cambió la eliminación del botón borrar en la función "agregarInvitado" de "this.parentNode.style.display = 'none';" a "botonBorrar.parentNode.remove();" para eliminar completamente el elemento del DOM.
  });
}