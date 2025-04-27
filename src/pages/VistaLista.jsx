import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import useTareas from '../hooks/useTareas'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

function VistaLista() {
  const { user } = useAuth()
  const { tareas, loading, error } = useTareas()
  const [tareasFiltradas, setTareasFiltradas] = useState([])

  useEffect(() => {
    setTareasFiltradas(tareas)
  }, [tareas])

  const formatearFecha = (fecha) =>
    format(new Date(fecha), "EEEE dd/MM/yyyy", { locale: es })

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Lista de Tareas</h1>

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
