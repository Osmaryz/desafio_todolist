const lista_tareas = [
    {
      nombre_tareas: "Lavar",
      num_id: 1,
      estado_pendiente: false,
    },
    {
      nombre_tareas: "Estudiar",
      num_id: 2,
      estado_pendiente: false,
    },
    {
      nombre_tareas: "Practicar deporte",
      num_id: 3,
      estado_pendiente: false,
    },
  ];
  
const total_resultado = document.querySelector("#total_resultado");
const total_realizadas = document.querySelector("#total_realizadas");
const tarea_ingresada = document.querySelector("#tarea");
const btn_agregar_tarea = document.querySelector("#btn_agregar");
const btn_eliminar_tarea = document.querySelector("#btn_eliminar");
const estado_tarea_container = document.querySelector(
  "#estado_tarea_container"
);
const estado_tareas_visualizador = document.querySelector(
  "#estado_tareas_realizadas"
);

const agregar_elemento_nuevo = btn_agregar_tarea.addEventListener(
  "click",
  () => {
    const tarea_nueva = tarea_ingresada.value;
    const id_correlativo = lista_tareas.length + 1;
    
    tarea_ingresada.value = "";
    console.log(lista_tareas);
    // creación de objeto
    const propiedades_tareas = {
      nombre_tareas: tarea_nueva,
      num_id: id_correlativo,
      estado_pendiente: false,
    };
    lista_tareas.push(propiedades_tareas);
    const id_tarea = propiedades_tareas.num_id;
    let elemento_lista_nuevo = document.createElement("div");
    elemento_lista_nuevo.innerHTML = `<div style="display: flex; flex-direction:row; justify-content:space-around;"> 
<li id="correlativo_tarea"> Id: ${propiedades_tareas.num_id}</li>
<li id="tarea_digitada" >${propiedades_tareas.nombre_tareas}</li>
<li id= "estado_${propiedades_tareas.num_id}">Pendiente</li>
<input type = "checkbox" id="caja_modificar_${propiedades_tareas.num_id}">
<button id="btn_eliminar_${propiedades_tareas.num_id}">X</button></div>`;
    estado_tareas_visualizador.appendChild(elemento_lista_nuevo);

    modificar_estado_tarea(propiedades_tareas);
    eliminar_estado_tarea(elemento_lista_nuevo, propiedades_tareas);
    recorrer_lista_tarea();
  }
);

function modificar_estado_tarea(propiedades_tareas) {
    const caja_modificar = document
      .querySelector(`#caja_modificar_${propiedades_tareas.num_id}`)
      .addEventListener("click", (evento) => {
        if (evento.target.checked) {
          lista_tareas.forEach((a) => {
            if (a.num_id == propiedades_tareas.num_id) {
              lista_tareas[lista_tareas.indexOf(a)].estado_pendiente = true;
              actualizarEstadoTarea(propiedades_tareas.num_id, true);
              recorrer_lista_tarea();
            }
          });
        } else {
          lista_tareas.forEach((a) => {
            if (a.num_id == propiedades_tareas.num_id) {
              lista_tareas[lista_tareas.indexOf(a)].estado_pendiente = false;
              actualizarEstadoTarea(propiedades_tareas.num_id, false);
              recorrer_lista_tarea();
            }
          });
        }
      });
  }

function eliminar_estado_tarea(elementoLista, propiedades_tareas) {
  const eliminar_elemento = document
    .querySelector(`#btn_eliminar_${propiedades_tareas.num_id}`)
    .addEventListener("click", () => {
      const index = lista_tareas.findIndex(
        (a) => a.num_id === propiedades_tareas.num_id
      );
      if (index !== -1) {
        lista_tareas.splice(index, 1);
        estado_tareas_visualizador.removeChild(elementoLista);
        recorrer_lista_tarea();
      }
    });
}

function recorrer_lista_tarea() {
  let contador_realizada = 0;
  let contador_no_realizadas = 0;
  lista_tareas.forEach((a) => {
    if (a.estado_pendiente == true) {
      contador_realizada = contador_realizada + 1;
    } else {
      contador_no_realizadas = contador_no_realizadas + 1;
    }
  });
  console.log(contador_realizada);
  console.log(contador_no_realizadas);
  total_realizadas.textContent = `Realizadas ${contador_realizada}`;
  total_resultado.textContent = `Total ${contador_realizada + contador_no_realizadas}`;

}

function actualizarEstadoTarea(num_id, estado_pendiente) {
    const estadoElement = document.querySelector(`#estado_${num_id}`);
    estadoElement.textContent = estado_pendiente ? "Realizado" : "Pendiente";
  }

  function agregarTodasLasTareasFromArray(arr) {
    arr.forEach((tarea) => {
      const elementoListaNuevo = document.createElement("div");
      elementoListaNuevo.innerHTML = `<div style="display: flex; flex-direction:row; justify-content:space-around;"> 
        <li id="correlativo_tarea"> Id: ${tarea.num_id}</li>
        <li id="tarea_digitada" >${tarea.nombre_tareas}</li>
        <li id= "estado_${tarea.num_id}">Pendiente</li>
        <input type="checkbox" id="caja_modificar_${tarea.num_id}">
        <button id="btn_eliminar_${tarea.num_id}">X</button></div>`;
  
      estado_tareas_visualizador.appendChild(elementoListaNuevo);
  
      modificar_estado_tarea(tarea);
      eliminar_estado_tarea(elementoListaNuevo, tarea);
      recorrer_lista_tarea();
    });
  }

agregarTodasLasTareasFromArray(lista_tareas)