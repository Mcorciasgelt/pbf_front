// src/components/ModalTarea.jsx
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

function ModalTarea({ tarea, onClose }) {
  if (!tarea) return null; // Si no hay tarea, no renderizamos nada.

  const formatearFecha = (fecha) =>
    format(new Date(fecha), "EEEE dd/MM/yyyy", { locale: es });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative">
        {/* Botón para cerrar el modal */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold"
        >
          ✖
        </button>

        {/* Contenido del modal */}
        <h2 className="text-2xl font-bold mb-4 text-center">{tarea.titulo}</h2>

        <p className="mb-2"><strong>Fecha de entrega:</strong> {formatearFecha(tarea.fechaEntrega)}</p>

        {tarea.hijosAsociados?.length > 0 && (
          <p className="mb-2">
            <strong>Hijo(s) asociado(s):</strong> {tarea.hijosAsociados.map((hijo) => hijo.nombre).join(', ')}
          </p>
        )}

        <p className="mb-2">
          <strong>Padre responsable:</strong> {tarea.padreResponsable?.nombre || 'Sin asignar'}
        </p>

        <p className="mb-2">
          <strong>Estado:</strong> {tarea.completada ? '✅ Completada' : '❌ Pendiente'}
        </p>

        {tarea.asignatura && (
          <p className="mb-2">
            <strong>Asignatura:</strong> {tarea.asignatura}
          </p>
        )}

        {tarea.canal && (
          <p className="mb-2">
            <strong>Canal:</strong> {tarea.canal}
          </p>
        )}

        {tarea.descripcion && (
          <p className="mb-2">
            <strong>Descripción:</strong> {tarea.descripcion}
          </p>
        )}
      </div>
    </div>
  );
}

export default ModalTarea;
