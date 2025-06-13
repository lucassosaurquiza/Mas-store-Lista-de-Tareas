
// 1- Creamos 2 variables, una para almacenar las tareas y otra para el cuerpo de la tabla
const LLAVE_TAREAS = 'tareas';
const tareas = cargarTareas();
let tareaCuerpo;

// 2- Creamos una función para renderizar la tabla
export function iniciarTabla(selector = '#task-body') {
  tareaCuerpo = document.querySelector(selector);
  render();
}

// 3- Creamos una funcion para agregar tareas a la tabla
export function agregarTarea(nombre, descripcion, fecha) {
  tareas.unshift({
    nombre,
    descripcion,
    fecha,
    completada: false
  });
  guardarTareas()
  render();
}

function cargarTareas() {
  try {
    return JSON.parse(localStorage.getItem(LLAVE_TAREAS)) || [];
  } catch {
    return [];
  }
}


export function guardarTareas() {
  localStorage.setItem(LLAVE_TAREAS, JSON.stringify(tareas));
}

// 4- Creamos una funcion para eliminar tareas de la tabla
export function eliminarTarea(index) {
  tareas.splice(index, 1);
  guardarTareas();
  render();
}

// 5- Creamos una funcion para renderizar la tabla

function render() {
  if (!tareaCuerpo) return;
  tareaCuerpo.innerHTML = '';

  tareas.forEach((tarea, index) => {
    const fila = document.createElement('tr');

    // 👇  si está completada, agregamos la clase verde
    if (tarea.completada) fila.classList.add('fila-completada');

    fila.innerHTML = `
      <td>
        <input type="checkbox"
               class="estado-checkbox"
               data-index="${index}"
               ${tarea.completada ? 'checked' : ''}>
      </td>
      <td>${tarea.nombre}</td>
      <td>${tarea.descripcion}</td>
      <td>${tarea.fecha}</td>
      <td><button class="delete-button" data-index="${index}">🗑</button></td>
    `;
    tareaCuerpo.appendChild(fila);
  });
}

// Delegación de eventos
document.addEventListener('click', e => {
  if (e.target.matches('.delete-button')) eliminarTarea(e.target.dataset.index);
});

document.addEventListener('change', e => {
  if (e.target.matches('.estado-checkbox')) {
    const fila = e.target.closest('tr');
    const i = Number(e.target.dataset.index);

    tareas[i].completada = e.target.checked;
    guardarTareas();

    // 👉  activamos o quitamos la clase en caliente
    fila.classList.toggle('fila-completada', e.target.checked);
  }
});