class Tarea {
    constructor(nombre) {
        this.nombre = nombre;
        this.estado = 'pendiente'; 
    }
}

const tareas = [];

document.getElementById('addTaskButton').addEventListener('click', agregarTarea);

function agregarTarea() {
    const tareaInput = document.getElementById('newTaskInput');
    const nombreTarea = tareaInput.value.trim();

    if (nombreTarea !== '') {
        const nuevaTarea = new Tarea(nombreTarea);
        tareas.push(nuevaTarea);
        tareaInput.value = '';
        actualizarInterfaz();
    }
}

function actualizarInterfaz() {
    const pendienteLista = document.getElementById('pendienteTasks');
    const haciendoLista = document.getElementById('haciendoTasks');
    const completadaLista = document.getElementById('completadaTasks');

    pendienteLista.innerHTML = '';
    haciendoLista.innerHTML = '';
    completadaLista.innerHTML = '';

    tareas.forEach((tarea, index) => {
        const tareaItem = document.createElement('li');
        tareaItem.textContent = tarea.nombre;

        if (tarea.estado === 'pendiente') {
            const hacerBtn = crearBoton('Hacer', () => cambiarEstado(index, 'haciendo'));
            tareaItem.appendChild(hacerBtn);
            pendienteLista.appendChild(tareaItem);
        } else if (tarea.estado === 'haciendo') {
            const completarBtn = crearBoton('Completar', () => cambiarEstado(index, 'completada'));
            const regresarBtn = crearBoton('Regresar', () => cambiarEstado(index, 'pendiente'));
            tareaItem.appendChild(completarBtn);
            tareaItem.appendChild(regresarBtn);
            haciendoLista.appendChild(tareaItem);
        } else if (tarea.estado === 'completada') {
            completadaLista.appendChild(tareaItem);
        }
    });
}

function crearBoton(texto, callback) {
    const boton = document.createElement('button');
    boton.textContent = texto;
    boton.onclick = callback;
    return boton;
}

function cambiarEstado(index, nuevoEstado) {
    tareas[index].estado = nuevoEstado;
    actualizarInterfaz();
}

