import { useEffect, useState, useCallback } from 'react';
import api from '../services/api';

function useMiembros() {
  const [miembros, setMiembros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // rehice la función usando callback para poder recargar los usuarios después de eliminar con refetch
  const obtenerMiembros = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/users/family', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMiembros(response.data.miembros);
      setError(null);
    } catch (error) {
      console.error('Error al obtener miembros:', error);
      setError('No se pudieron cargar los miembros.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    obtenerMiembros();
  }, [obtenerMiembros]);

  return { miembros, loading, error, refetch: obtenerMiembros };
}

export default useMiembros;
