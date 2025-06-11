import { agregarTarea } from "./table.js";

export function openModal() {

  // 1- Creamos las constantes que vamos a necesitar para el modal

  const botonNuevo = document.getElementById('button');
  const modal = document.getElementById('taskModal');
  const formulario = document.getElementById('taskForm');
  const inputNombre = document.getElementById('taskName');
  const inputDescripcion = document.getElementById('taskDescription');
  const inputFecha = document.getElementById('taskDate');
  const botonCerrar = document.getElementById('closeModal');

  // 2- Añadimos un evento al botón nuevo para abrir el modal
  botonNuevo.addEventListener('click', () => {
    modal.hidden = false;
    modal.classList.add('open');
    inputDescripcion.focus();
  });

  // 3- Añadimos un evento al formulario para manejar el envío de la tarea
  formulario.addEventListener('submit', e => {
    e.preventDefault();

    // Obtenemos los valores de los inputs y el iminamos los espacios en blanco
    const nombre = inputNombre.value.trim();
    const descripcion = inputDescripcion.value.trim();
    const fecha = inputFecha.value;

    // Validamos que los campos no estén vacíos
    if (!nombre || !descripcion || !fecha) return;

    // Llamamos a la función para agregar la tarea
    agregarTarea(nombre, descripcion, fecha);

    // Limpiamos los inputs y cerramos el modal
    formulario.reset();
    cerrarModal();

  });

  // 4- Hacemos clic afuera del modal para cerrarlo
  modal.addEventListener('click', evento => {
    if (evento.target === modal) cerrarModal();
  });

  // 5- Añadimos un evento al botón de cerrar para cerrar el modal
  botonCerrar.addEventListener('click', cerrarModal);

  // 6- Añadimos un evento al documento para cerrar el modal con la tecla Escape
  function cerrarModal() {
    modal.classList.remove('open');
    setTimeout(() => (modal.hidden = true), 300);
  }

}