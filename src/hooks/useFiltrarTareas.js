
// la idea es que esta función haga el filtro y se llame a esta función desde cualquier página con useEffect
const useFiltrarTareas = (tareas, filtroHijo, filtroPadre, filtroEstado) => {
    let filtradas = tareas;
  
    if (filtroHijo !== 'todos') {
      filtradas = filtradas.filter((tarea) =>
        tarea.hijosAsociados.some((hijo) => hijo._id === filtroHijo)
      );
    }
  
    if (filtroPadre !== 'todos') {
      filtradas = filtradas.filter((tarea) =>
        tarea.padreResponsable?._id === filtroPadre
      );
    }
  
    if (filtroEstado === 'completadas') {
      filtradas = filtradas.filter((tarea) => tarea.completada === true);
    } else if (filtroEstado === 'pendientes') {
      filtradas = filtradas.filter((tarea) => tarea.completada === false);
    }
  
    return filtradas;
  };
  
  export default useFiltrarTareas;
  