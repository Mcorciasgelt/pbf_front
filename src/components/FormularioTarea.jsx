import { useEffect } from 'react';
import useMiembros from '../hooks/useMiembros';


function FormularioTarea({
  titulo,
  setTitulo,
  canal,
  setCanal,
  fechaEntrega,
  setFechaEntrega,
  descripcion,
  setDescripcion,
  asignatura,
  setAsignatura,
  hijosSeleccionados,
  setHijosSeleccionados,
  padreResponsable,
  setPadreResponsable,
  handleSubmit,
  error,
  loading,
}) {
  const { miembros } = useMiembros();

  const hijos = miembros.filter((m) => m.tipo === 'hijo');
  const padres = miembros.filter((m) => m.tipo === 'padre');

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div>
        <label className="block text-gray-700">Título de la tarea:</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
          className="border rounded w-full py-2 px-3"
        />
      </div>

      <div>
        <label className="block text-gray-700">Canal de origen:</label>
        <select
          value={canal}
          onChange={(e) => setCanal(e.target.value)}
          required
          className="border rounded w-full py-2 px-3"
        >
          <option value="">Selecciona un canal</option>
          <option value="Email">Email</option>
          <option value="Agenda">Agenda</option>
          <option value="Clickedu">Clickedu</option>
          <option value="Grupo Padres">Grupo Padres</option>
          <option value="AMPA">AMPA</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-700">Fecha de entrega:</label>
        <input
          type="date"
          value={fechaEntrega}
          onChange={(e) => setFechaEntrega(e.target.value)}
          required
          className="border rounded w-full py-2 px-3"
        />
      </div>

      <div>
        <label className="block text-gray-700">Descripción:</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
          className="border rounded w-full py-2 px-3"
        />
      </div>

      <div>
        <label className="block text-gray-700">Asignatura:</label>
        <select
          value={asignatura}
          onChange={(e) => setAsignatura(e.target.value)}
          required
          className="border rounded w-full py-2 px-3"
        >
          <option value="">Selecciona una asignatura</option>
          <option value="Matemáticas">Matemáticas</option>
          <option value="Lengua">Lengua</option>
          <option value="Natural Science">Natural Science</option>
          <option value="Social Science">Social Science</option>
          <option value="Hebreo">Hebreo</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-700">Hijos asociados:</label>
        <select
          multiple
          value={hijosSeleccionados}
          onChange={(e) =>
            setHijosSeleccionados(Array.from(e.target.selectedOptions, (option) => option.value))
          }
          required
          className="border rounded w-full py-2 px-3"
        >
          {hijos.map((hijo) => (
            <option key={hijo._id} value={hijo._id}>
              {hijo.nombre}
            </option>
          ))}
        </select>
        <p className="text-sm text-gray-500 mt-1">Puedes seleccionar más de uno manteniendo pulsado Ctrl o Cmd.</p>
      </div>

      <div>
        <label className="block text-gray-700">Padre responsable (opcional):</label>
        <select
          value={padreResponsable}
          onChange={(e) => setPadreResponsable(e.target.value)}
          className="border rounded w-full py-2 px-3"
        >
          <option value="">Sin asignar</option>
          {padres.map((padre) => (
            <option key={padre._id} value={padre._id}>
              {padre.nombre}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
      >
        {loading ? 'Guardando...' : 'Guardar Tarea'}
      </button>
    </form>
  );
}

export default FormularioTarea;
