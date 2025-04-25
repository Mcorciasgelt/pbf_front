import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

function Miembros() {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [miembros, setMiembros] = useState([]);
  const [error, setError] = useState('');

  // aseguramos que el usuario que está ingresando sea padre
  useEffect(() => {
    if (user === null) return
    
    if (user?.tipo !== 'padre') {
      navigate('/panel');
    }
  }, [user, navigate]);

  // se cargan los miembros de la familia que luego se pintarán en el html renderizado de abajo
  useEffect(() => {
    const obtenerMiembros = async () => {
      try {
        const response = await api.get('/users/family')
        setMiembros(response.data.miembros);
      } catch (err) {
        console.error('Error al obtener miembros:', err);
        setError('No se pudieron cargar los miembros.');
      }
    };

    obtenerMiembros();
  }, []);


  const handleEliminar = async (id) => {
    const confirmacion = window.confirm('¿Estás seguro de que quieres eliminar este miembro?');
  
    if (confirmacion) {
      try {
        await api.delete(`/users/${id}`); 
        // Refrescamos la lista de miembros:
        const response = await api.get('/users/family');
        setMiembros(response.data.miembros);
      } catch (err) {
        console.error('Error al eliminar miembro:', err);
        setError('No se pudo eliminar el miembro.');
      }
    }
  };
  

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-gray-200 flex items-center justify-center">
        <p className="text-xl font-bold">Foto de perfil o familia</p>
      </div>

      <div className="w-1/2 p-8">
        <h1 className="text-3xl font-bold mb-6">Miembros de la familia</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          onClick={() => navigate('/nuevo-miembro')}
          className="mb-6 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Añadir nuevo miembro
        </button>

        <ul>
          {miembros.map((miembro) => (
            <li
              key={miembro._id}
              className="mb-4 p-4 border rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="font-bold">{miembro.nombre}</p>
                <p className="text-sm text-gray-600">{miembro.email} — {miembro.tipo}</p>
              </div>

              <div className="space-x-2">
                <button 
                    onClick={() => navigate(`/editar-miembro/${miembro._id}`)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-1 px-3 rounded">
                    Editar
                </button>
                <button 
                    onClick={() => handleEliminar(miembro._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">
                    Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Miembros;