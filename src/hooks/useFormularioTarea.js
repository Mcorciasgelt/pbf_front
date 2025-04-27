

import { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

/**
 
 * @param {Object} opciones - Opcional. Puede incluir datos iniciales de la tarea y el método (POST o PUT).
 * @returns estados y funciones necesarias para el formulario.
 */


function useFormularioTarea({ tareaInicial = null, metodo = 'POST', tareaId = null } = {}) {
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState(tareaInicial?.titulo || '')
  const [canal, setCanal] = useState(tareaInicial?.canal || '')
  const [fechaEntrega, setFechaEntrega] = useState(tareaInicial?.fechaEntrega || '')
  const [descripcion, setDescripcion] = useState(tareaInicial?.descripcion || '')
  const [asignatura, setAsignatura] = useState(tareaInicial?.asignatura || '')
  const [hijosSeleccionados, setHijosSeleccionados] = useState(tareaInicial?.hijosAsociados || [])
  const [padreResponsable, setPadreResponsable] = useState(tareaInicial?.padreResponsable || '')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // para poder precargar el formulario en caso de ser un editar
  useEffect(() => {
    if (metodo === 'PUT' && tareaId) {
      const obtenerTarea = async () => {
        setLoading(true);
        try {
          const response = await api.get(`/tasks/${tareaId}`);
          const tarea = response.data.tarea;

          setTitulo(tarea.titulo);
          setCanal(tarea.canal);
          setFechaEntrega(tarea.fechaEntrega.slice(0, 10)); // formato YYYY-MM-DD
          setDescripcion(tarea.descripcion);
          setAsignatura(tarea.asignatura);
          setHijosSeleccionados(tarea.hijosAsociados.map((h) => h._id));
          setPadreResponsable(tarea.padreResponsable?._id || '');
        } catch (err) {
          console.error('Error al obtener la tarea:', err);
          setError('No se pudo cargar la tarea');
        } finally {
          setLoading(false);
        }
      };

      obtenerTarea();
    }
  }, [metodo, tareaId])



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // todos los campos deben ser obligaorios:
    if (!titulo || !canal || !fechaEntrega || !descripcion || !asignatura || hijosSeleccionados.length === 0) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    const payload = {
      titulo,
      canal,
      fechaEntrega,
      descripcion,
      asignatura,
      hijosAsociados: hijosSeleccionados,
      padreResponsable: padreResponsable || null,
    };

    try {
      setLoading(true);

      if (metodo === 'POST') {
        await api.post('/tasks', payload);
      } else if (metodo === 'PUT' && tareaId) {
        await api.put(`/tasks/${tareaId}`, payload);
      }

      navigate('/vistas');
    } catch (err) {
      console.error('Error en el formulario de tarea:', err);
      setError('Hubo un problema al procesar la tarea. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
}

export default useFormularioTarea;