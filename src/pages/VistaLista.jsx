import { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import useTareas from '../hooks/useTareas'
import useMiembros from '../hooks/useMiembros'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import VistaCalendario from './VistaCalendario'
import useFiltrarTareas from '../hooks/useFiltrarTareas'
import { useNavigate } from 'react-router-dom';
import api from '../services/api'
import ModalTarea from '../components/ModalTarea'



function VistaLista() {
  const { user } = useAuth()
  const { tareas, loading, error, refetchTareas } = useTareas()
  const { miembros } = useMiembros()

  const navigate = useNavigate();

  const [vista, setVista] = useState('lista')

  const [filtroHijo, setFiltroHijo] = useState('todos')
  const [filtroPadre, setFiltroPadre] = useState('todos')
  const [filtroEstado, setFiltroEstado] = useState('pendientes')

  const [tareasFiltradas, setTareasFiltradas] = useState([])

  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);

  useEffect(() => {
    const filtradas = useFiltrarTareas(tareas, filtroHijo, filtroPadre, filtroEstado);
    setTareasFiltradas(filtradas);
  }, [tareas, filtroHijo, filtroPadre, filtroEstado]);

  const formatearFecha = (fecha) =>
    format(new Date(fecha), "EEEE dd/MM/yyyy", { locale: es })

    {/*hacemos la lógica para que se elimine una tarea*/}
    const handleEliminar = async (id) => {
        const confirmacion = window.confirm('¿Seguro que quieres eliminar esta tarea?');
        if (confirmacion) {
        try {
            await api.delete(`/tasks/${id}`);
            await refetchTareas();
        } catch (err) {
            console.error('Error al eliminar tarea:', err);
        }
        }
    };

    {/*MARCAR COMO COMPLETADA*/}
    const handleMarcarCompletada = async (id, estadoActual) => {
        try {
          await api.patch(`/tasks/${id}`, { completada: !estadoActual });
          await refetchTareas()
        } catch (err) {
          console.error('Error al marcar como completada:', err);
        }
      };
      
  const handleVerDetalle = (tarea) => {
    setTareaSeleccionada(tarea);
  };
  
  // Para cerrar el modal:
  const handleCerrarModal = () => {
    setTareaSeleccionada(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Lista de Tareas</h1>


        {/* slector del tipo de vista que se verá en la pantalla */}
        <div className="flex items-center justify-center gap-8 m-10">
            <label className="font-bold text-2xl">Vistas:</label>
            <select
                value={vista}
                onChange={(e) => setVista(e.target.value)}
                className="border rounded px-4 py-2 text-2xl"
            >
                <option value="lista">Lista</option>
                <option value="calendario">Calendario</option>
            </select>
        </div>

        {/* filtros. no lo entendí todo, pero funcionan */}

        <div className="flex flex-wrap justify-center gap-4 mb-6">
            <select
                value={filtroHijo}
                onChange={(e) => setFiltroHijo(e.target.value)}
                className="border rounded px-4 py-2 text-xl"
            >
                <option value="todos">Todos los hijos</option>
                {miembros
                .filter((m) => m.tipo === 'hijo')
                .map((hijo) => (
                    <option key={hijo._id} value={hijo._id}>
                    {hijo.nombre}
                    </option>
                ))}
            </select>

            <select
                value={filtroPadre}
                onChange={(e) => setFiltroPadre(e.target.value)}
                className="border rounded px-4 py-2 text-xl"
            >
                <option value="todos">Todos los padres</option>
                {miembros
                .filter((m) => m.tipo === 'padre')
                .map((padre) => (
                    <option key={padre._id} value={padre._id}>
                    {padre.nombre}
                    </option>
                ))}
            </select>

            <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="border rounded px-4 py-2 text-xl"
            >
                <option value="todas">Todas</option>
                <option value="pendientes">Pendientes</option>
                <option value="completadas">Completadas</option>
            </select>

            <button
                onClick={() => {
                    setFiltroPadre('todos')
                    setFiltroHijo('todos')
                    setFiltroEstado('pendientes')
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold text-xl py-2 px-4 rounded"
                >
                    Limpiar Filtros
            </button>

        </div>
    
    {vista === 'lista' ? (
    
    <>

      {loading && <p className="text-gray-600 text-center">Cargando tareas...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && tareasFiltradas.length === 0 && (
        <p className="text-gray-600 text-center">No hay tareas para mostrar.</p>
      )}

      {!loading && tareasFiltradas.length > 0 && (
        <ul className="space-y-4">
          {tareasFiltradas.map((tarea) => (
            <li 
            key={tarea._id} 
            className="border rounded p-4 shadow"
            onClick={() => handleVerDetalle(tarea)}
            >
              <p className="font-bold text-xl">{tarea.titulo}</p>
              <p className="text-xl text-gray-600">Fecha: {formatearFecha(tarea.fechaEntrega)}</p>
              {user.tipo === 'padre' && (
                <p className="text-l text-gray-600">
                  Hijo asociado: {tarea.hijosAsociados.map((h) => h.nombre).join(', ')}
                </p>
              )}
              <p className="text-l text-gray-600">
                Padre responsable: {tarea.padreResponsable?.nombre || 'Sin asignar'}
              </p>
              <p className="text-l text-gray-600">
                Estado: {tarea.completada ? '✅ Completada' : '❌ Pendiente'}
              </p>
              <div className="flex gap-2 mt-2">

                {/* botones para eliminar, editar y marcar omo completada la tarea*/}
                <button
                    onClick={() => navigate(`/editar-tarea/${tarea._id}`)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-1 px-3 rounded"
                >
                    Editar
                </button>

                <button
                    onClick={() => handleEliminar(tarea._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                >
                    Eliminar
                </button>

                <button
                    onClick={() => handleMarcarCompletada(tarea._id, tarea.completada)}
                    className={`${
                    tarea.completada
                        ? 'bg-green-400 hover:bg-green-500'
                        : 'bg-blue-500 hover:bg-blue-700'
                    } text-white font-bold py-1 px-3 rounded`}
                >
                    {tarea.completada ? '✅ Completa' : 'Marcar como hecha'}
                </button>
                </div>

            </li>
          ))}
        </ul>
      )}
      </>
    ) : (
        <VistaCalendario
        filtroHijo={filtroHijo}
        filtroPadre={filtroPadre}
        filtroEstado={filtroEstado}
         />
    )}

    {tareaSeleccionada && (
      <ModalTarea tarea={tareaSeleccionada} onClose={handleCerrarModal} />
    )}

    </div>
  );
}

export default VistaLista;
