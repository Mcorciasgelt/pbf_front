import { useEffect, useState, useCallback } from 'react'
import api from '../services/api'
import useAuth from './useAuth'

function useTareas() {
  const { token } = useAuth();
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


    const obtenerTareas = useCallback(async () => {
      setLoading(true);

      try {
        // llamada a la api de tareas para obtener todas las tareas
        const response = await api.get('/tasks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // hace un ordenado de las tsreas
        const tareasOrdenadas = response.data.tareas.sort(
          (a, b) => new Date(a.fechaEntrega) - new Date(b.fechaEntrega)
        );
        setTareas(tareasOrdenadas);
      } catch (error) {
        setError('No se pudieron obtener las tareas.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    },[]);

    useEffect(() => {
    obtenerTareas();
    }, [obtenerTareas]);

  return { tareas, loading, error, refetchTareas: obtenerTareas };
}

export default useTareas;
