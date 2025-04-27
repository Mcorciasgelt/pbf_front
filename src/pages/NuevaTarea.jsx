import useFormularioTarea from '../hooks/useFormularioTarea';
import FormularioTarea from '../components/FormularioTarea';

function NuevaTarea() {
  const {
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
  } = useFormularioTarea({ metodo: 'POST' });

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 bg-gray-200 flex items-center justify-center p-6">
        <p className="text-xl font-bold text-center">Foto de perfil o familia</p>
      </div>

      <div className="w-full md:w-1/2 p-8">
        <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
          Crear nueva tarea
        </h1>

        <FormularioTarea
          titulo={titulo}
          setTitulo={setTitulo}
          canal={canal}
          setCanal={setCanal}
          fechaEntrega={fechaEntrega}
          setFechaEntrega={setFechaEntrega}
          descripcion={descripcion}
          setDescripcion={setDescripcion}
          asignatura={asignatura}
          setAsignatura={setAsignatura}
          hijosSeleccionados={hijosSeleccionados}
          setHijosSeleccionados={setHijosSeleccionados}
          padreResponsable={padreResponsable}
          setPadreResponsable={setPadreResponsable}
          handleSubmit={handleSubmit}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default NuevaTarea;
