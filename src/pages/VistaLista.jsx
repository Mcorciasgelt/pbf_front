import { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import useTareas from '../hooks/useTareas'
import useMiembros from '../hooks/useMiembros'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

function VistaLista() {
  const { user } = useAuth()
  const { tareas, loading, error } = useTareas()
  const { miembros } = useMiembros()

  const [filtroHijo, setFiltroHijo] = useState('todos')
  const [filtroPadre, setFiltroPadre] = useState('todos')
  const [filtroEstado, setFiltroEstado] = useState('todos')

  const [tareasFiltradas, setTareasFiltradas] = useState([])

  useEffect(() => {
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

    setTareasFiltradas(filtradas)
  }, [tareas, filtroHijo, filtroPadre, filtroEstado])

  const formatearFecha = (fecha) =>
    format(new Date(fecha), "EEEE dd/MM/yyyy", { locale: es })

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Lista de Tareas</h1>

        {/* filtros. no lo entendí todo, pero funcionan */}

        <div className="flex flex-wrap justify-center gap-4 mb-6">
            <select
                value={filtroHijo}
                onChange={(e) => setFiltroHijo(e.target.value)}
                className="border rounded px-4 py-2"
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
                className="border rounded px-4 py-2"
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
                className="border rounded px-4 py-2"
            >
                <option value="todas">Todas</option>
                <option value="pendientes">Pendientes</option>
                <option value="completadas">Completadas</option>
            </select>
        </div>


      {loading && <p className="text-gray-600 text-center">Cargando tareas...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && tareasFiltradas.length === 0 && (
        <p className="text-gray-600 text-center">No hay tareas para mostrar.</p>
      )}

      {!loading && tareasFiltradas.length > 0 && (
        <ul className="space-y-4">
          {tareasFiltradas.map((tarea) => (
            <li key={tarea._id} className="border rounded p-4 shadow">
              <p className="font-bold">{tarea.titulo}</p>
              <p className="text-sm text-gray-600">Fecha: {formatearFecha(tarea.fechaEntrega)}</p>
              {user.tipo === 'padre' && (
                <p className="text-sm text-gray-600">
                  Hijo asociado: {tarea.hijosAsociados.map((h) => h.nombre).join(', ')}
                </p>
              )}
              <p className="text-sm text-gray-600">
                Padre responsable: {tarea.padreResponsable?.nombre || 'Sin asignar'}
              </p>
              <p className="text-sm text-gray-600">
                Estado: {tarea.completada ? '✅ Completada' : '❌ Pendiente'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default VistaLista;
