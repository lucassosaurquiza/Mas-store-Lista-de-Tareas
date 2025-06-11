
// 1- Creamos 2 variables, una para almacenar las tareas y otra para el cuerpo de la tabla
const tareas = [];
let tareaCuerpo;

// 2- Creamos una función para renderizar la tabla
export function iniciarTabla(selector = '#task-body') {
  tareaCuerpo = document.querySelector(selector);
  if (tareaCuerpo) render();
}

// 3- Creamos una funcion para agregar tareas a la tabla
export function agregarTarea(nombre, descripcion, fecha) {
  tareas.push({
    nombre,
    descripcion,
    fecha,
    completada: false
  });
  render();
}

export function guardarTareas() {
  localStorage.setItem('tareas', JSON.stringify(tareas));
}

// 4- Creamos una funcion para eliminar tareas de la tabla
export function eliminarTarea(index) {
  tareas.splice(index, 1);
  render();
}

// 5- Creamos una funcion para renderizar la tabla
function render() {
  if (!tareaCuerpo) return;
  tareaCuerpo.innerHTML = '';

  tareas.forEach((tarea, index) => {
    const fila = document.createElement('tr');

    fila.innerHTML = `
        <td class="table-data">
        <input type="checkbox"
               class="estado-checkbox"
               data-index="${index}"
               ${tarea.completada ? 'checked' : ''}>
      </td>
      <td class="table-data"> ${tarea.nombre}</td>
      <td class="table-data ${tarea.completada ? 'done' : ''}">
        ${tarea.descripcion}
      </td>
      <td class="table-data">${tarea.fecha}</td>
      <td class="table-data">
        <button class="delete-button" data-index="${index}">🗑</button>
      </td>`;
    tareaCuerpo.appendChild(fila);
  });
}

// 6- Añadimos un solo evento al documento para manejar los clics en los botones de eliminar
document.addEventListener('click', evento => {
  if (evento.target.matches('.delete-button')) {
    eliminarTarea(evento.target.dataset.index);
  }
})