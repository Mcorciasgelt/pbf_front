import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import useTareas from '../hooks/useTareas';
import { format } from 'date-fns'
import useFiltrarTareas from '../hooks/useFiltrarTareas';

function VistaCalendario({ filtroHijo, filtroPadre, filtroEstado }) {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const { tareas, loading, error } = useTareas()

  const tareasFiltradas = useFiltrarTareas(tareas, filtroHijo, filtroPadre, filtroEstado);


  const formatearFecha = (fecha) => format(new Date(fecha), 'yyyy-MM-dd')

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Vista Calendario</h1>

      {loading && <p className="text-center text-gray-600">Cargando tareas...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      
      <div className="flex justify-center">
        <Calendar
          onChange={setFechaSeleccionada}
          value={fechaSeleccionada}
          tileContent={({ date, view }) => {
            if (view !== 'month') return null;
          
            const tareasDelDia = tareasFiltradas.filter(
                (tarea) => formatearFecha(tarea.fechaEntrega) === formatearFecha(date)
            );
          
            // mostrar +XX cuando sean más de dos
            if (tareasDelDia.length > 2) {
              return (
                <div className="mt-1 text-xs text-center text-gray-700">
                  +{tareasDelDia.length} tareas
                </div>
              );
            }
          
            return tareasDelDia.length > 0 ? (
              <div className="mt-1 text-xs text-center space-y-1">
                {tareasDelDia.map((tarea) => (
                  <div
                    key={tarea._id}
                    className={`rounded px-1 py-0.5 cursor-pointer truncate
                      ${tarea.completada
                        ? 'bg-green-200 text-green-800 hover:bg-green-300'
                        : 'bg-yellow-200 text-red-800 hover:bg-orange-300'}
                    `}
                    title={`${tarea.titulo} - ${tarea.hijosAsociados.map((h) => h.nombre).join(', ')}`}
                    onClick={() => alert(`Aquí abriríamos el detalle de la tarea: ${tarea.titulo}`)}
                  >
                    <p className="truncate">{tarea.titulo}</p>
                    {tarea.hijosAsociados.length > 0 && (
                      <p className="text-[10px] text-gray-600 truncate">
                        {tarea.hijosAsociados.map((hijo) => hijo.nombre).join(', ')}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : null;
          }}
          tileClassName="h-28 md:h-32 p-1"
          className="w-full mx-auto text-sm"
          
        />
      </div>

    </div>
  );
}

export default VistaCalendario;
