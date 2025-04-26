import useTareas from '../hooks/useTareas'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function Panel() {
  const { user } = useAuth();
  const { tareas, loading, error } = useTareas()
  const hoy = new Date()

  // crea el filtro que necesito en esta pantalla
  const tareasFiltradas = tareas
  .filter((tarea) => 
    !tarea.completada && 
    new Date(tarea.fechaEntrega) >= hoy
  )
  .slice(0, 3)

  // formato para la fecha con el día de la semana
  const formatearFecha = (fecha) =>
    format(new Date(fecha), "EEEE dd/MM/yyyy", { locale: es })

  return (

    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 bg-gray-200 flex items-center justify-center p-6">
        <p className="text-xl font-bold text-center">Foto de perfil o familia</p>
      </div>

      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">
          ¡Hola, {user?.nombre}!
        </h1>

        <div className="w-full max-w-md bg-white shadow-md rounded p-4">
          <h2 className="text-xl font-bold mb-4 text-center">Próximas tareas</h2>

          {loading && <p className="text-gray-600 text-center">Cargando tareas...</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}
          {!loading && tareasFiltradas.length === 0 && (
            <p className="text-gray-600 text-center">No hay tareas próximas.</p>
          )}

          {!loading && tareasFiltradas.length > 0 && (
            <ul className="space-y-3">
              {tareasFiltradas.map((tarea) => (
                <li key={tarea._id} className="p-3 border rounded shadow">
                  <p className="font-bold">{tarea.titulo}</p>
                  <p className="text-sm text-gray-600">
                    Fecha: {formatearFecha(tarea.fechaEntrega)}
                  </p>
                  {user.tipo === 'padre' && (
                    <p className="text-sm text-gray-600">
                      Hijo asociado: {tarea.hijosAsociados.map((h) => h.nombre).join(', ')}
                    </p>
                  )}
                  <p className="text-sm text-gray-600">
                    Padre responsable: {tarea.padreResponsable?.nombre || 'Sin asignar'}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>

  );
}

export default Panel;
